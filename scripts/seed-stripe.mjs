#!/usr/bin/env node
/**
 * Creates a Stripe Product + one-off Price for every catalogue entry whose
 * `_id` is still a `price_TODO_…` placeholder, then writes the real Price IDs
 * back into src/data/products.ts.
 *
 * You only ever edit src/data/products.ts (name + price). This script does the
 * rest. It is idempotent: products are tagged with `metadata.slug`, so a re-run
 * reuses anything it already created instead of duplicating it.
 *
 *   node scripts/seed-stripe.mjs                    # dry run (default)
 *   node scripts/seed-stripe.mjs --execute          # actually create them
 *   node scripts/seed-stripe.mjs --execute --only=e2e-test-product
 *
 * Needs STRIPE_SECRET_KEY in the environment.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Stripe from 'stripe';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'src/data/products.ts');
const API_VERSION = '2025-08-27.basil'; // keep in sync with the checkout route

const args = process.argv.slice(2);
const EXECUTE = args.includes('--execute');
const ONLY = args.find((a) => a.startsWith('--only='))?.slice('--only='.length);

/**
 * Load products.ts without a TypeScript toolchain: strip the imports and the
 * type annotation, then evaluate it as a module. Regex-parsing the file would
 * break as soon as it is hand-edited; this tolerates any valid formatting.
 */
async function loadProducts() {
  const src = fs.readFileSync(FILE, 'utf8');
  const js = src
    .replace(/^\s*import[^\n]*\n/gm, '')
    .replace(/:\s*Product\[\]/g, '')
    .replace(/^export const/gm, 'const')
    .concat('\nexport { products };');
  const mod = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
  return mod.products;
}

/**
 * Slug comes from the `price_TODO_<slug>` placeholder, not the image path:
 * products may share a photo (the e2e test product borrows fm-hat's), and the
 * slug has to stay unique because it is the idempotency key in Stripe metadata.
 */
const slugOf = (product) => {
  if (product._id.startsWith('price_TODO_')) return product._id.slice('price_TODO_'.length);
  const m = /^\/images\/products\/([^/]+)\//.exec(product.images?.[0] ?? '');
  if (!m) throw new Error(`cannot derive slug for ${product._id}`);
  return m[1];
};

const main = async () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('STRIPE_SECRET_KEY is not set.');
    process.exit(1);
  }
  // Restricted keys are rk_live_… / rk_test_…, so a startsWith('sk_live_')
  // check would mislabel a live restricted key as TEST.
  const mode = key.includes('_live_') ? 'LIVE' : 'TEST';
  const stripe = new Stripe(key, { apiVersion: API_VERSION });

  const products = await loadProducts();
  let pending = products.filter((p) => p._id.startsWith('price_TODO_'));
  if (ONLY) pending = pending.filter((p) => slugOf(p) === ONLY);

  console.log(`\n  Stripe mode : ${mode}${mode === 'LIVE' ? '  ← real money, real products' : ''}`);
  console.log(`  Action      : ${EXECUTE ? 'CREATE' : 'dry run (pass --execute to create)'}`);
  console.log(`  Pending     : ${pending.length} of ${products.length} catalogue entries\n`);

  // `discountPrice` is the final amount the customer pays, so that — not
  // `price` — is what the Stripe Price must be set to when it is present.
  const priced = pending.map((p) => ({
    product: p,
    slug: slugOf(p),
    amount: Math.round((p.discountPrice ?? p.price) * 100),
  }));

  const unpriced = priced.filter((r) => r.amount < 50);
  if (unpriced.length) {
    console.error('These entries have no usable price yet (Stripe minimum is €0.50):');
    for (const r of unpriced) console.error(`  - ${r.slug.padEnd(28)} ${(r.amount / 100).toFixed(2)} EUR`);
    console.error('\nSet `price:` for them in src/data/products.ts first. Nothing was created.');
    process.exit(1);
  }

  const mapping = new Map();
  for (const { product, slug, amount } of priced) {
    // The Stripe Product name is what the customer reads on the Checkout page
    // and on their receipt, so it follows the storefront's language: Portuguese.
    // Internal test products stay English — nobody but us ever sees those.
    const isInternal = product.categories.includes('test');
    const name = isInternal ? product.translations.en.name : product.translations.pt.name;
    const label = `${slug.padEnd(28)} ${(amount / 100).toFixed(2).padStart(7)} EUR  "${name}"`;

    if (!EXECUTE) {
      console.log(`  would create  ${label}`);
      continue;
    }

    // Reuse anything a previous run already made for this slug.
    const found = await stripe.products.search({
      query: `metadata['slug']:'${slug}' AND active:'true'`,
      limit: 1,
    });
    let stripeProduct = found.data[0];
    if (stripeProduct) {
      console.log(`  reusing product  ${slug} (${stripeProduct.id})`);
    } else {
      stripeProduct = await stripe.products.create({
        name,
        metadata: { slug, source: 'freakminimalism' },
      });
    }

    const existingPrices = await stripe.prices.list({
      product: stripeProduct.id,
      active: true,
      limit: 100,
    });
    let price = existingPrices.data.find(
      (p) => p.unit_amount === amount && p.currency === 'eur' && !p.recurring,
    );
    if (!price) {
      price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: amount,
        currency: 'eur',
      });
    }

    mapping.set(product._id, price.id);
    console.log(`  created  ${label}  -> ${price.id}`);
  }

  if (!EXECUTE) {
    console.log('\nDry run only. Re-run with --execute to create these in Stripe.\n');
    return;
  }

  if (mapping.size) {
    let src = fs.readFileSync(FILE, 'utf8');
    for (const [placeholder, realId] of mapping) {
      src = src.replaceAll(`"${placeholder}"`, `"${realId}"`);
    }
    // The TODO comment above each _id is now stale for the ones we filled in.
    src = src.replace(/^\s*\/\/ TODO: replace with the real Stripe Price ID\n(?=\s*_id: "price_(?!TODO_))/gm, '');
    fs.writeFileSync(FILE, src);
    console.log(`\n  Wrote ${mapping.size} Price ID(s) into src/data/products.ts\n`);
  }
};

main().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
