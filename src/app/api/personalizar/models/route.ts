import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

type RoupaJson = {
  types: Array<{ type: string }>;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    if (!category) {
      return NextResponse.json({ error: 'Missing category' }, { status: 400 });
    }
    const baseDir = path.join(process.cwd(), 'public', 'images', 'personalizar', category);
    
    // Read all directories in the category folder
    let allDirs: string[] = [];
    try {
      const items = await fs.readdir(baseDir, { withFileTypes: true });
      allDirs = items.filter((d) => d.isDirectory()).map((d) => d.name);
    } catch (e) {
      return NextResponse.json({ models: [] });
    }

    // Try to read roupa.json for ordering and display names
    const roupaPath = path.join(baseDir, 'roupa.json');
    let orderedModels: string[] = [];
    try {
      const roupaContent = await fs.readFile(roupaPath, 'utf-8');
      const roupaData: RoupaJson = JSON.parse(roupaContent);
      if (Array.isArray(roupaData.types)) {
        // Extract types from roupa.json and normalize to match folder names
        const roupaTypes = roupaData.types.map((t) => t.type);
        // Filter to only include types that have corresponding folders
        orderedModels = roupaTypes.filter((type) => {
          // Normalize both for comparison (uppercase, spaces to nothing)
          const normalized = type.toUpperCase().replace(/\s+/g, '');
          return allDirs.some((dir) => dir.toUpperCase().replace(/\s+/g, '') === normalized);
        });
      }
    } catch {
      // If roupa.json doesn't exist or is invalid, use all directories sorted A-Z
      orderedModels = allDirs.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }

    // If roupa.json exists but doesn't cover all folders, append missing ones
    if (orderedModels.length < allDirs.length) {
      const normalizedOrdered = orderedModels.map((m) => m.toUpperCase().replace(/\s+/g, ''));
      const missing = allDirs.filter((dir) => {
        const norm = dir.toUpperCase().replace(/\s+/g, '');
        return !normalizedOrdered.includes(norm);
      });
      orderedModels = [...orderedModels, ...missing];
    }

    return NextResponse.json({ models: orderedModels });
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
