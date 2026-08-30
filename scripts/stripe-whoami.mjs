#!/usr/bin/env node
/**
 * Connectivity + permission check for STRIPE_SECRET_KEY.
 *
 * Confirms the key reaches the right Stripe account and reports which of the
 * scopes this repo needs are actually granted, so a restricted key that is
 * missing one fails here instead of halfway through a seeding run.
 *
 *   npm run stripe:whoami                  # read-only probes
 *   npm run stripe:whoami -- --probe-write # also create + delete a throwaway product
 *
 * Needs STRIPE_SECRET_KEY (see .env.example).
 */
import Stripe from 'stripe';

const API_VERSION = '2025-08-27.basil'; // keep in sync with the checkout route
const EXPECTED_ACCOUNT = 'acct_1RclOgCTQhRcTCnZ'; // FREAK MINIMALISM
const PROBE_WRITE = process.argv.slice(2).includes('--probe-write');

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error(
    '\nSTRIPE_SECRET_KEY is not set.\n' +
      'Copy .env.example to .env.local and put the key there, then re-run.\n',
  );
  process.exit(1);
}

const kind = /^rk_/.test(key) ? 'restricted' : /^sk_/.test(key) ? 'full secret' : 'unrecognised prefix';
const mode = key.includes('_live_') ? 'LIVE' : 'TEST';
const stripe = new Stripe(key, { apiVersion: API_VERSION });

/**
 * Run one probe and report it without aborting the rest of the checks.
 * `optional` marks a scope this repo does not actually need, so a denial is
 * reported as a note rather than counted as a failure.
 */
const probe = async (label, fn, { optional = false } = {}) => {
  try {
    const detail = await fn();
    console.log(`  ok    ${label.padEnd(24)} ${detail ?? ''}`);
    return true;
  } catch (err) {
    const denied = err.code === 'more_permissions_required';
    if (optional && denied) {
      console.log(`  n/a   ${label.padEnd(24)} scope not granted (not needed by this repo)`);
      return true;
    }
    console.log(`  FAIL  ${label.padEnd(24)} ${err.code ?? err.type ?? ''} ${err.message}`);
    return false;
  }
};

/**
 * Confirm which account the key belongs to. Reading the account outright needs
 * connected_account_read, which this repo has no other use for — but Stripe
 * names the account in the permission error, so identity is verifiable either way.
 */
const checkAccount = async () => {
  try {
    const acct = await stripe.accounts.retrieve();
    return { id: acct.id, via: 'accounts.retrieve' };
  } catch (err) {
    const m = /account '(acct_[A-Za-z0-9]+)'/.exec(err.message ?? '');
    if (m) return { id: m[1], via: 'permission error' };
    throw err;
  }
};

const main = async () => {
  console.log(`\n  Key type    : ${kind}`);
  console.log(`  Mode        : ${mode}${mode === 'LIVE' ? '  ← real money, real catalogue' : ''}`);
  console.log(`  API version : ${API_VERSION}\n`);

  const results = [];

  results.push(
    await probe('account identity', async () => {
      const { id, via } = await checkAccount();
      if (id !== EXPECTED_ACCOUNT) throw new Error(`key belongs to ${id}, expected ${EXPECTED_ACCOUNT}`);
      return `${id} — matches FREAK MINIMALISM (via ${via})`;
    }),
  );
  results.push(await probe('products read', async () => `${(await stripe.products.list({ limit: 3 })).data.length} returned`));
  results.push(await probe('products search', async () => `${(await stripe.products.search({ query: "metadata['source']:'freakminimalism'", limit: 3 })).data.length} tagged by this repo`));
  results.push(await probe('prices read', async () => `${(await stripe.prices.list({ limit: 3 })).data.length} returned`));
  results.push(await probe('coupons read', async () => `${(await stripe.coupons.list({ limit: 3 })).data.length} returned`));
  results.push(await probe('promo codes read', async () => `${(await stripe.promotionCodes.list({ limit: 3 })).data.length} returned`));

  if (PROBE_WRITE) {
    results.push(
      await probe('products write', async () => {
        const p = await stripe.products.create({
          name: 'whoami probe — safe to delete',
          metadata: { source: 'freakminimalism', probe: 'true' },
        });
        // A product with no prices attached can be hard-deleted, so the probe
        // leaves nothing behind in the dashboard.
        await stripe.products.del(p.id);
        return `created and deleted ${p.id}`;
      }),
    );
  } else {
    console.log('  skip  products write         (pass --probe-write to test it)');
  }

  const failed = results.filter((r) => !r).length;
  console.log(
    failed
      ? `\n  ${failed} probe(s) failed — the key is missing those scopes.\n`
      : '\n  All probes passed.\n',
  );
  process.exit(failed ? 1 : 0);
};

main().catch((err) => {
  console.error('\nFailed:', err.message, '\n');
  process.exit(1);
});
