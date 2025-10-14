'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type Subcategory = {
  name: string;
  path: string;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

// Mapeamento de códigos para nomes de cores formatados
const COLOR_NAMES: Record<string, string> = {
  '00': 'White',
  '1D': 'Black Pure',
  '2E': 'Yellow Fizz',
  '39': 'Caqui',
  '3H': 'Pure Orange',
  '44': 'Verde Escuro',
  '4M': 'Aqua Green',
  '52': 'Vermelho',
  '5N': 'Radiant Purp',
  '5T': 'Soft Rose',
  '5W': 'Magenta Pink',
  '5Z': 'Dark Cherry',
  '6I': 'Pure Sky',
  '6L': 'Royal',
  '6S': 'Navy Blue',
  '6V': 'Nordic Blue',
  '95': 'Cinza Claro',
  '9C': 'Heather M GR',
  '9F': 'Asphalt',
  '9G': 'Grey Fog'
};

// Ordem de exibição das cores (com 'White' primeiro, depois ordem alfabética)
const COLOR_ORDER = [
  '00', // White primeiro
  ...Object.keys(COLOR_NAMES)
    .filter(code => code !== '00')
    .sort((a, b) => COLOR_NAMES[a].localeCompare(COLOR_NAMES[b]))
];

// ... restante do código existente ...

const CustomizePage = () => {
  // ... implementação existente ...
};

export default CustomizePage;
