import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

// Allow letters, numbers, spaces, dots, underscores and dashes. Reject "."/".."
// and anything with slashes. Combined with the resolved-path guard below this
// stops path traversal while supporting real folder names like "MANGA CUMPRIDA"
// or "POLAR GAMA WOMEN".
const SAFE_SEGMENT = /^[a-zA-Z0-9 ._-]+$/;

const isSafe = (segment: string | null): segment is string =>
  !!segment && SAFE_SEGMENT.test(segment) && segment !== "." && segment !== "..";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const model = searchParams.get("model");
    const density = searchParams.get("density");
    const gama = searchParams.get("gama");

    if (!isSafe(category) || !isSafe(model)) {
      return NextResponse.json({ error: "Invalid category or model" }, { status: 400 });
    }
    if (density !== null && !isSafe(density)) {
      return NextResponse.json({ error: "Invalid density" }, { status: 400 });
    }
    if (gama !== null && !isSafe(gama)) {
      return NextResponse.json({ error: "Invalid gama" }, { status: 400 });
    }

    const baseRoot = path.join(process.cwd(), "public", "images", "personalizar");
    const baseDir = path.join(baseRoot, category, model);
    const dir = density
      ? path.join(baseDir, density)
      : gama
        ? path.join(baseDir, gama)
        : baseDir;

    // Defence-in-depth: make sure the resolved directory is still under baseRoot.
    const normalized = path.resolve(dir);
    if (!normalized.startsWith(path.resolve(baseRoot) + path.sep)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    let entries: string[] = [];
    try {
      const files = await fs.readdir(normalized, { withFileTypes: true });
      entries = files
        .filter((f) => f.isFile())
        .map((f) => f.name)
        .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()));
    } catch {
      return NextResponse.json({ images: [] });
    }

    // Prefer 00.*, then alphanumeric sort
    const preferredFirst = (a: string, b: string) => {
      const aIsPreferred = /^00\./i.test(a);
      const bIsPreferred = /^00\./i.test(b);
      if (aIsPreferred && !bIsPreferred) return -1;
      if (!aIsPreferred && bIsPreferred) return 1;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    };

    return NextResponse.json({ images: entries.sort(preferredFirst) });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
