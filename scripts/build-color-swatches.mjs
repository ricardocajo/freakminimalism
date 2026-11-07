// Samples the garment colour from every customize-page product photo and
// writes src/app/customize/swatches.json ({ "<path under personalizar>": "#rrggbb" }),
// which the customize page uses to draw colour swatches.
//
// Re-run after adding or replacing photos in public/images/personalizar:
//   npm run swatches
//
// How: shrink the photo, look at its central area (where the garment is),
// drop pixels that match the background (sampled from the corners, or
// transparent), and take the per-channel median of what is left.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images/personalizar");
const OUT = path.resolve("src/app/customize/swatches.json");
const IMAGE = /\.(png|jpe?g|webp)$/i;
// Side/back shots are only kept for colours that have no front photo.
const NOT_FRONT = /_(Side|Back|L|C|l|c)(\.[^.]+)$/;
const FRONT_SUFFIXES = ["Front", "F", "f"];

const SIZE = 64;
const BG_DISTANCE = 40; // RGB distance under which a pixel counts as background

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (IMAGE.test(entry.name)) yield full;
  }
}

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};
const hex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

async function sample(file) {
  const { data } = await sharp(file)
    .rotate()
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    const i = (y * SIZE + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };

  // Background: the corners (skip transparent ones; PNGs have no background).
  const corners = [px(1, SIZE - 2), px(SIZE - 2, SIZE - 2), px(SIZE - 2, 1)].filter((p) => p[3] > 200);
  const bg = corners.length ? [0, 1, 2].map((c) => median(corners.map((p) => p[c]))) : null;

  const opaque = [];
  const garment = [];
  const lo = Math.round(SIZE * 0.3);
  const hi = Math.round(SIZE * 0.7);
  for (let y = lo; y < hi; y++) {
    for (let x = lo; x < hi; x++) {
      const p = px(x, y);
      if (p[3] < 200) continue;
      opaque.push(p);
      if (!bg || dist(p, bg) > BG_DISTANCE) garment.push(p);
    }
  }
  // A garment the same colour as the background (white tee on white) leaves
  // almost nothing after the background filter: fall back to all pixels.
  const pick = garment.length > opaque.length * 0.05 ? garment : opaque;
  if (!pick.length) return null;
  return hex([0, 1, 2].map((c) => median(pick.map((p) => p[c]))));
}

const result = {};
let count = 0;
for await (const file of walk(ROOT)) {
  const key = path.relative(ROOT, file).split(path.sep).join("/");
  try {
    const color = await sample(file);
    if (color) result[key] = color;
    count++;
  } catch (err) {
    console.warn("skip", key, err.message);
  }
}
// Drop side/back swatches whose colour also has a front photo.
for (const key of Object.keys(result)) {
  const m = key.match(NOT_FRONT);
  if (!m) continue;
  const stem = key.slice(0, -m[0].length);
  if (FRONT_SUFFIXES.some((f) => result[`${stem}_${f}${m[2]}`])) delete result[key];
}
// Keep the side photo only if there's no back one either.
for (const key of Object.keys(result)) {
  const m = key.match(/_(Side|L|l)(\.[^.]+)$/);
  if (!m) continue;
  const stem = key.slice(0, -m[0].length);
  if (["Back", "C", "c"].some((b) => result[`${stem}_${b}${m[2]}`])) delete result[key];
}
const sorted = Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(OUT, JSON.stringify(sorted, null, 0).replace(/,"/g, ',\n"') + "\n");
console.log(`sampled ${count} photos -> ${path.relative(process.cwd(), OUT)}`);
