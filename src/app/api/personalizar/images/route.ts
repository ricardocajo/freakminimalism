import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const model = searchParams.get('model');
    const density = searchParams.get('density');

    if (!category || !model) {
      return NextResponse.json({ error: 'Missing category or model' }, { status: 400 });
    }

    // Build absolute directory path under public/
    // If density is provided, attempt to read from the density subfolder
    const baseDir = path.join(process.cwd(), 'public', 'images', 'personalizar', category, model);
    const dir = density ? path.join(baseDir, density) : baseDir;

    let entries: string[] = [];
    try {
      const files = await fs.readdir(dir, { withFileTypes: true });
      entries = files
        .filter((f) => f.isFile())
        .map((f) => f.name)
        .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()));
    } catch (err) {
      // If directory does not exist or can't be read, return empty list
      return NextResponse.json({ images: [] });
    }

    // Prefer 00.*, then alphanumeric sort
    const preferredFirst = (a: string, b: string) => {
      const aIsPreferred = /^00\./i.test(a);
      const bIsPreferred = /^00\./i.test(b);
      if (aIsPreferred && !bIsPreferred) return -1;
      if (!aIsPreferred && bIsPreferred) return 1;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    };

    const sorted = entries.sort(preferredFirst);

    return NextResponse.json({ images: sorted });
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
