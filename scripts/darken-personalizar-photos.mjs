// Puts the customize-page photos on the site's black background and removes
// the supplier logo ("th clothes" red box) from the top-left corner.
//
//   node scripts/darken-personalizar-photos.mjs              # rewrite photos in place
//   node scripts/darken-personalizar-photos.mjs --out DIR    # write to DIR instead (preview)
//   node scripts/darken-personalizar-photos.mjs --only KING/T-SHIRT/150/Luanda_White_Front.jpg ...
//
// Only opaque JPEGs are touched (PNG cut-outs are already transparent).
// Run `npm run swatches` afterwards so the colour swatches are re-sampled.
//
// How it works, per photo (shrunk to 1600px):
// 1. The red logo box in the top-left corner is found and marked as background.
// 2. The background is flood-filled from the image border: every connected
//    pixel close to the background colour.
// 3. White/light garments are almost the background colour, so the fill leaks
//    into them. The supplier shoots every colour of a model from one template
//    (same outline, pixel for pixel), so photos are grouped by folder + view +
//    size. Each photo's colour is sampled inside the group's largest outline
//    (pulled in from the edge), so a leaked cut-out can't hide a white
//    garment; light photos use the majority-vote outline of the group's
//    coloured photos instead of their own.
// 4. The garment is composited onto BG. Edge pixels are a mix of garment and
//    old background; for coloured garments each one is "un-mixed" (how much
//    of it was background, swapped for BG) so no light rim is left. Light
//    garments, where that can't be measured, get a slightly shrunk, softened edge.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images/personalizar");
const BG = [10, 10, 10]; // #0a0a0a, the customize viewer background
const MAX_SIDE = 1600;
const TOLERANCE = 30; // RGB distance from the background colour still counted as background
const LOGO_REGION = 0.2; // the logo lives in the top-left 20% × 20%
// A garment is "light" (white, cream…) when its colour is this close to the
// background: the fill leaks into it, so it borrows its siblings' outline.
const LIGHT_DISTANCE = 60;

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const OUT_DIR = outIdx >= 0 ? path.resolve(args[outIdx + 1]) : null;
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? new Set(args.slice(onlyIdx + 1).filter((a) => !a.startsWith("--"))) : null;

async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (/\.jpe?g$/i.test(e.name)) yield full;
  }
}

const median = (xs) => xs.sort((a, b) => a - b)[xs.length >> 1];

// "Luanda_Red_Front.jpg" / "preto_f.jpg" → "F"; no view suffix → "-".
const viewOf = (name) => {
  const v = name.match(/_(Front|Side|Back|F|L|C)\.[^.]+$/i)?.[1].toUpperCase();
  return !v ? "-" : v === "FRONT" ? "F" : v === "SIDE" ? "L" : v === "BACK" ? "C" : v;
};

const load = (file) =>
  sharp(file)
    .rotate()
    .resize(MAX_SIDE, MAX_SIDE, { fit: "inside", withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

// Returns the garment mask (1 = garment) for one photo.
function garmentMask(data, W, H) {
  const at = (x, y) => (y * W + x) * 3;

  // Background colour: median of the right and bottom edges (the logo sits top-left).
  const edge = [];
  for (let y = 0; y < H; y += 4) edge.push(at(W - 1, y));
  for (let x = 0; x < W; x += 4) edge.push(at(x, H - 1));
  const bg = [0, 1, 2].map((c) => median(edge.map((i) => data[i + c])));
  const nearBg = (k) =>
    Math.hypot(data[k * 3] - bg[0], data[k * 3 + 1] - bg[1], data[k * 3 + 2] - bg[2]) < TOLERANCE;

  // Logo: bounding box of strongly red pixels in the top-left corner.
  const rw = Math.round(W * LOGO_REGION);
  const rh = Math.round(H * LOGO_REGION);
  let x0 = rw, y0 = rh, x1 = -1, y1 = -1, red = 0;
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const i = at(x, y);
      if (data[i] > 150 && data[i] - data[i + 1] > 70 && data[i] - data[i + 2] > 70) {
        red++;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  // 0 = unvisited, 1 = forced background (logo), 2 = background
  const state = new Uint8Array(W * H);
  let logo = false;
  // A real logo is a solid block well inside the corner region.
  if (red > rw * rh * 0.05 && x1 < rw - 2 && y1 < rh - 2) {
    logo = true;
    const pad = Math.round(Math.min(W, H) * 0.01);
    for (let y = Math.max(0, y0 - pad); y <= Math.min(rh, y1 + pad); y++)
      for (let x = Math.max(0, x0 - pad); x <= Math.min(rw, x1 + pad); x++) state[y * W + x] = 1;
  }

  const stack = [];
  const push = (k) => {
    if (state[k] === 2) return;
    if (state[k] === 1 || nearBg(k)) {
      state[k] = 2;
      stack.push(k);
    }
  };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  for (let k = 0; k < state.length; k++) if (state[k] === 1) push(k);
  while (stack.length) {
    const k = stack.pop();
    const x = k % W;
    if (x > 0) push(k - 1);
    if (x < W - 1) push(k + 1);
    if (k >= W) push(k - W);
    if (k < W * (H - 1)) push(k + W);
  }

  const mask = new Uint8Array(W * H);
  const near = new Uint8Array(W * H);
  const garment = [[], [], []];
  for (let k = 0; k < mask.length; k++) {
    if (nearBg(k)) near[k] = 1;
    if (state[k] !== 2) {
      mask[k] = 1;
      if (k % 7 === 0) for (let c = 0; c < 3; c++) garment[c].push(data[k * 3 + c]);
    }
  }
  const colour = garment[0].length ? garment.map(median) : bg;
  // The logo box must stay background even when borrowing another outline.
  const logoBox = logo ? { x0, y0, x1, y1 } : null;
  return { mask, near, logoBox, bg, colour };
}

// Background enclosed by a coloured garment (the gap between an arm and the
// body) isn't reachable from the border: clear every enclosed
// background-coloured patch too big to be a highlight on the fabric.
function clearEnclosedBackground(mask, near, W, H) {
  const minHole = Math.round(W * H * 0.0005);
  const seen = new Uint8Array(W * H);
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || seen[start] || !near[start]) continue;
    const comp = [start];
    seen[start] = 1;
    for (let j = 0; j < comp.length; j++) {
      const k = comp[j];
      const x = k % W;
      for (const n of [x > 0 ? k - 1 : -1, x < W - 1 ? k + 1 : -1, k - W, k + W]) {
        if (n < 0 || n >= mask.length || seen[n] || !mask[n] || !near[n]) continue;
        seen[n] = 1;
        comp.push(n);
      }
    }
    if (comp.length >= minHole) for (const k of comp) mask[k] = 0;
  }
}

// Pixel-wise majority vote of masks (all the same size).
function majority(list, W, H) {
  const votes = new Uint16Array(W * H);
  for (const m of list) for (let k = 0; k < votes.length; k++) votes[k] += m.mask[k];
  const out = new Uint8Array(W * H);
  for (let k = 0; k < votes.length; k++) out[k] = votes[k] * 2 > list.length ? 1 : 0;
  return out;
}

// Grow/shrink the white (garment) area of a mask by `px` pixels. Note sharp's
// morphology is named for dark features: its erode() grows white areas and
// dilate() shrinks them.
const morph = (mask, W, H, op, px) =>
  sharp(Buffer.from(mask.map((v) => (v ? 255 : 0))), { raw: { width: W, height: H, channels: 1 } })
    [op === "shrink" ? "dilate" : "erode"](px)
    .extractChannel(0)
    .raw()
    .toBuffer();

// `unmix`: { bg, colour } of the original photo, for coloured garments.
async function render(data, W, H, mask, unmix, outFile) {
  const out = Buffer.alloc(W * H * 3);
  if (unmix) {
    const inner = await morph(mask, W, H, "shrink", 4);
    const outer = await morph(mask, W, H, "grow", 2);
    const { bg, colour: g } = unmix;
    const d = [g[0] - bg[0], g[1] - bg[1], g[2] - bg[2]];
    const len2 = d[0] ** 2 + d[1] ** 2 + d[2] ** 2;
    for (let k = 0; k < W * H; k++) {
      const i = k * 3;
      if (inner[k]) {
        out[i] = data[i]; out[i + 1] = data[i + 1]; out[i + 2] = data[i + 2];
      } else if (!outer[k]) {
        out[i] = BG[0]; out[i + 1] = BG[1]; out[i + 2] = BG[2];
      } else {
        // Share of garment in this pixel: its projection on the bg→garment line.
        const p = ((data[i] - bg[0]) * d[0] + (data[i + 1] - bg[1]) * d[1] + (data[i + 2] - bg[2]) * d[2]) / len2;
        const a = Math.min(1, Math.max(0, p));
        for (let c = 0; c < 3; c++) {
          const v = data[i + c] + (BG[c] - bg[c]) * (1 - a);
          out[i + c] = Math.min(255, Math.max(0, Math.round(v)));
        }
      }
    }
  } else {
    // Shrink by 2px (drops the rim mixed with the old background) and soften.
    const shrunk = await morph(mask, W, H, "shrink", 2);
    const alpha = await sharp(shrunk, { raw: { width: W, height: H, channels: 1 } })
      .blur(1.2)
      .extractChannel(0)
      .raw()
      .toBuffer();
    if (alpha.length !== W * H) throw new Error(`mask size ${alpha.length} != ${W * H}`);
    for (let k = 0; k < W * H; k++) {
      const a = alpha[k] / 255;
      for (let c = 0; c < 3; c++) out[k * 3 + c] = Math.round(data[k * 3 + c] * a + BG[c] * (1 - a));
    }
  }
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  const buf = await sharp(out, { raw: { width: W, height: H, channels: 3 } })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(outFile, buf);
}

// Group every photo by folder + view; size is checked once loaded.
const groups = new Map();
for await (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const key = `${path.dirname(rel)}|${viewOf(rel)}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(rel);
}

let done = 0, logos = 0, borrowed = 0;
const lightFiles = [];
const noOutline = [];
const suspicious = [];
for (const members of groups.values()) {
  if (ONLY && !members.some((m) => ONLY.has(m))) continue;

  // Pass 1: own masks for the whole group.
  const masks = new Map();
  for (const rel of members) {
    const { data, info } = await load(path.join(ROOT, rel));
    const m = garmentMask(data, info.width, info.height);
    masks.set(rel, { ...m, W: info.width, H: info.height });
  }

  // Pass 2: classify. Sample each photo's colour inside the group's largest
  // outline (a leaked white cut-out is smaller, so it never wins), shrunk so
  // the sample stays clear of the edges.
  const bySize = new Map();
  for (const [rel, m] of masks) {
    m.rel = rel;
    m.area = m.mask.reduce((a, v) => a + v, 0);
    const key = `${m.W}x${m.H}`;
    if (!bySize.has(key)) bySize.set(key, []);
    bySize.get(key).push(m);
  }
  const outlines = new Map(); // "WxH" -> outline of the coloured photos (or null)
  for (const [key, list] of bySize) {
    const { W, H } = list[0];
    const largest = list.reduce((a, b) => (b.area > a.area ? b : a));
    const region = await morph(largest.mask, W, H, "shrink", Math.round(Math.min(W, H) * 0.01));
    for (const m of list) {
      const { data } = await load(path.join(ROOT, m.rel));
      const px = [[], [], []];
      for (let k = 0; k < region.length; k += 5) {
        if (region[k]) for (let c = 0; c < 3; c++) px[c].push(data[k * 3 + c]);
      }
      const col = px[0].length ? px.map(median) : m.colour;
      m.light = Math.hypot(col[0] - m.bg[0], col[1] - m.bg[1], col[2] - m.bg[2]) < LIGHT_DISTANCE;
    }
    const coloured = list.filter((m) => !m.light);
    outlines.set(key, coloured.length ? majority(coloured, W, H) : null);
  }
  // Pass 3: write.
  for (const rel of members) {
    if (ONLY && !ONLY.has(rel)) continue;
    const own = masks.get(rel);
    let mask = own.mask;
    const shared = own.light ? outlines.get(`${own.W}x${own.H}`) : null;
    if (shared) {
      mask = Uint8Array.from(shared);
      if (own.logoBox) {
        const { x0, y0, x1, y1 } = own.logoBox;
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) mask[y * own.W + x] = 0;
      }
      borrowed++;
      lightFiles.push(rel);
    } else if (own.light) {
      noOutline.push(rel);
    } else {
      clearEnclosedBackground(mask, own.near, own.W, own.H);
    }
    const ref = outlines.get(`${own.W}x${own.H}`);
    if (ref) {
      const ratio = mask.reduce((a, v) => a + v, 0) / ref.reduce((a, v) => a + v, 0);
      if (ratio < 0.9 || ratio > 1.1) suspicious.push(`${ratio.toFixed(2)}  ${rel}`);
    }
    const { data } = await load(path.join(ROOT, rel));
    const unmix = own.light ? null : { bg: own.bg, colour: own.colour };
    await render(data, own.W, own.H, mask, unmix, OUT_DIR ? path.join(OUT_DIR, rel) : path.join(ROOT, rel));
    done++;
    if (own.logoBox) logos++;
    if (done % 50 === 0) console.log(`${done} done…`);
  }
}
if (suspicious.length)
  console.warn("outline differs >10% from its model's — check these:\n  " + suspicious.join("\n  "));
if (noOutline.length) console.warn("light photos with no coloured sibling to borrow from:", noOutline);
console.log("light photos (borrowed outline):\n  " + lightFiles.join("\n  "));
console.log(
  `processed ${done} photos: ${logos} logos removed, ${borrowed} light garments used their model's outline` +
    (OUT_DIR ? ` -> ${OUT_DIR}` : " (in place)"),
);
