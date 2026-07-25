import { products } from "@/data/products";
import { productHref } from "@/app/actions";

/**
 * The game runs on a fixed logical playfield and is scaled to fit whatever
 * space the container has. This keeps difficulty identical on every device —
 * a phone and a desktop see exactly the same spawn positions and speeds.
 */
export const FIELD_W = 400;
export const FIELD_H = 700;

export const MAX_CLUTTER = 12;

/** Noise cleared before one point of clutter is forgiven. */
export const CLUTTER_FORGIVE_EVERY = 15;

export const NOISE_R = 26;
export const PRODUCT_R = 44;

/** Points per cleared noise, before the combo multiplier. */
export const POINTS_PER_CLEAR = 10;
export const COMBO_STEP = 6;
export const COMBO_MAX = 5;

/**
 * Difficulty ramps with elapsed seconds and then plateaus. The opening is
 * deliberately calm; the ramp is what carries the run. Top speed is 480
 * units/s — an entity crosses the 700-unit field in 1.5s — and the field
 * reaches it at 100s.
 */
export const spawnInterval = (elapsed: number) =>
  Math.max(0.26, 1.15 - elapsed * 0.018);

export const fallSpeed = (elapsed: number) =>
  110 + Math.min(elapsed, 100) * 3.7;

export const productChance = (elapsed: number) =>
  Math.min(0.32, 0.22 + elapsed * 0.001);

export interface Sprite {
  id: string;
  src: string;
  /** Small optimised variant — what the falling sprite actually draws. */
  thumb: string;
  href: string;
  name: { en: string; pt: string };
}

/**
 * Products are drawn at roughly 88px, so shipping the full packshots (3.2MB
 * across the catalogue) is pure waste on mobile. Next's optimiser serves a
 * 128px variant instead; it is 12 unique source images, well inside the free
 * tier's transformation budget, and cached from then on.
 */
const thumbUrl = (src: string) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=128&q=70`;

/**
 * Playable inventory is derived from the real catalogue, so the game updates
 * itself whenever a product is added to products.ts. Only the first image of
 * each product is used — it is the packshot.
 */
export const SPRITES: Sprite[] = products
  .filter((p) => p.images.length > 0)
  .map((p) => ({
    id: p._id,
    src: p.images[0],
    thumb: thumbUrl(p.images[0]),
    href: productHref(p._id),
    name: { en: p.translations.en.name, pt: p.translations.pt.name },
  }));

export const HIGH_SCORE_KEY = "fm_game_best";
export const MUTED_KEY = "fm_game_muted";
