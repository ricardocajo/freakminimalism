import { Product } from "@/types/types";

// -------------------------------------------------------------------------
// Organic product ordering
//
// The catalogue in products.ts is grouped by category (all 3D works, then all
// hats, then all tops...) because that is how it is easiest to maintain. That
// is a bad way to *display* it — the grid reads as three solid blocks.
//
// mixProducts() interleaves the categories so every listing looks organically
// mixed, and it does so for whatever is in the array, so products added to
// products.ts in the future are spread automatically. No manual reordering.
//
// The shuffle is deterministic (hashed from each product's _id, not
// Math.random) on purpose:
//   - server render and client hydration must produce the same order
//   - pages are statically generated, so the order has to be build-stable
//   - a product keeps its place in the mix across deploys until the
//     catalogue itself changes
// -------------------------------------------------------------------------

// Tags that describe every product rather than a real product family — useless
// for grouping, so they are skipped when picking a product's mix bucket.
const GENERIC_CATEGORIES = new Set(["new", "test", "parcerias"]);

// FNV-1a, folded into [0, 1). Stable for a given string, well spread for the
// near-identical Stripe price IDs we use as product keys.
const hashToUnit = (value: string): number => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return ((hash >>> 0) % 100000) / 100000;
};

const mixBucket = (product: Product): string =>
  product.categories.find((cat) => !GENERIC_CATEGORIES.has(cat.toLowerCase())) ??
  product.categories[0] ??
  "other";

/**
 * Returns a new array with the products spread evenly across their categories.
 *
 * Each product gets a fractional slot `(index + 0.5) / groupSize` inside its
 * category, then everything is sorted by that slot. Because the slot is
 * proportional, a 12-item category lands roughly every 3rd tile in a 35-item
 * grid while a 5-item category lands roughly every 7th — no clumps and no
 * category bunched at the end, whatever the group sizes are.
 */
export const mixProducts = (list: Product[]): Product[] => {
  const groups = new Map<string, Product[]>();

  for (const product of list) {
    const bucket = mixBucket(product);
    const group = groups.get(bucket);
    if (group) group.push(product);
    else groups.set(bucket, [product]);
  }

  const slotted: { product: Product; slot: number; jitter: number }[] = [];

  for (const group of groups.values()) {
    // Shuffle inside the category so the order within a family is not the
    // source-file order either.
    const shuffled = [...group].sort(
      (a, b) => hashToUnit(a._id) - hashToUnit(b._id),
    );

    shuffled.forEach((product, index) => {
      slotted.push({
        product,
        slot: (index + 0.5) / shuffled.length,
        // Breaks slot ties (two categories of the same size) without ever
        // making the result non-deterministic.
        jitter: hashToUnit(`${product._id}:slot`),
      });
    });
  }

  return slotted
    .sort((a, b) => a.slot - b.slot || a.jitter - b.jitter)
    .map((entry) => entry.product);
};

/**
 * Same mix, rotated by an offset derived from `seed`. Used by the "you might
 * also like" strip so each product page shows a different slice of the
 * catalogue while staying stable for that page across builds.
 */
export const mixProductsRotated = (list: Product[], seed: string): Product[] => {
  const mixed = mixProducts(list);
  if (mixed.length === 0) return mixed;
  const offset = Math.floor(hashToUnit(seed) * mixed.length) % mixed.length;
  return [...mixed.slice(offset), ...mixed.slice(0, offset)];
};
