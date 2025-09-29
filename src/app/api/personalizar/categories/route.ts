import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const baseDir = path.join(process.cwd(), 'public', 'images', 'personalizar');
    let entries: string[] = [];
    try {
      const items = await fs.readdir(baseDir, { withFileTypes: true });
      entries = items.filter((d) => d.isDirectory()).map((d) => d.name);
    } catch (e) {
      // If folder doesn't exist, return empty
      return NextResponse.json({ categories: [] });
    }
    // Only expose known categories if present
    const allowed = new Set(['CHAPEUS', 'KID', 'KING', 'QUEEN', 'UNISEX']);
    const filtered = entries.filter((name) => allowed.has(name.toUpperCase()));
    // Sort in a canonical order matching the requested order
    const order = ['CHAPEUS', 'KID', 'KING', 'QUEEN', 'UNISEX'];
    const sorted = filtered.sort((a, b) => order.indexOf(a.toUpperCase()) - order.indexOf(b.toUpperCase()));
    return NextResponse.json({ categories: sorted });
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
