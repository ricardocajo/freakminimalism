#!/usr/bin/env node
/**
 * Pushes catalogue renames to Stripe.
 *
 * The Stripe Product name — not the one in products.ts — is what the customer
 * reads on the Checkout page and on their receipt, so renaming a product here
 * leaves the old name in front of buyers until this runs.
 *
 * For every entry in src/data/products.ts it resolves Price ID -> Product and
 * updates the Product name when it has drifted from the catalogue.
 *
 *   node scripts/sync-stripe-names.mjs             # dry run (default)
 *   node scripts/sync-stripe-names.mjs --execute   # actually rename them
 *
 * Needs STRIPE_SECRET_KEY (restricted key with Products write) in the
 * environment; the npm scripts load it from .env.local.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Stripe from 'stripe';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'src/data/products.ts');
const API_VERSION = '2025-08-27.basil'; // keep in sync with the checkout route

const EXECUTE = process.argv.includes('--execute');

// Same trick as seed-stripe.mjs: evaluate the data file with its imports
// stripped and the helpers it uses stubbed out.
async function loadProducts() {
  const src = fs.readFileSync(FILE, 'utf8');
  const stubs = 'const mixProducts = (list) => list;\nconst mixProductsRotated = (list) => list;\n';
  const js = stubs.concat(src
    .replace(/^\s*import[^\n]*\n/gm, '')
    .replace(/:\s*Product\[\]/g, '')
    .replace(/^export const/gm, 'const'))
    .concat('\nexport { products };');
  const mod = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
  return mod.products;
}

const main = async () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('STRIPE_SECRET_KEY is not set.');
    process.exit(1);
  }
  const mode = key.includes('_live_') ? 'LIVE' : 'TEST';
  const stripe = new Stripe(key, { apiVersion: API_VERSION });

  const products = await loadProducts();
  console.log(`\n  Stripe mode : ${mode}${mode === 'LIVE' ? '  ← real money, real products' : ''}`);
  console.log(`  Action      : ${EXECUTE ? 'RENAME' : 'dry run (pass --execute to apply)'}`);
  console.log(`  Checking    : ${products.length} catalogue entries\n`);

  let drifted = 0;
  for (const product of products) {
    if (product._id.startsWith('price_TODO_')) {
      console.log(`  skip     ${product._id} — not seeded yet, run stripe:seed`);
      continue;
    }
    // Customer-facing names follow the storefront's language: Portuguese.
    // Internal test products stay English — nobody but us ever sees those.
    const wanted = product.categories.includes('test')
      ? product.translations.en.name
      : product.translations.pt.name;

    const price = await stripe.prices.retrieve(product._id, { expand: ['product'] });
    const stripeProduct = price.product;
    if (typeof stripeProduct === 'string' || stripeProduct.deleted) {
      console.log(`  warn     ${product._id} — product unavailable`);
      continue;
    }
    if (stripeProduct.name === wanted) continue;

    drifted += 1;
    console.log(`  ${EXECUTE ? 'rename ' : 'would  '}  ${stripeProduct.id}  "${stripeProduct.name}" -> "${wanted}"`);
    if (EXECUTE) await stripe.products.update(stripeProduct.id, { name: wanted });
  }

  if (!drifted) console.log('  Every Stripe product name already matches the catalogue.');
  else if (!EXECUTE) console.log('\n  Dry run only. Re-run with --execute to apply.');
  console.log('');
};

main().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
