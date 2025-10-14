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

// Função para formatar os nomes dos modelos
export const prettyModelName = (raw: string) =>
  raw
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^M\.COMPRIDA$/i, 'Manga Comprida')
    .replace(/^SWEAT SCARDA$/i, 'Sweat Scarda')
    .replace(/^POLAR ZIPP WOMEN$/i, 'Polar Zipp Women');

export default function CustomizePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Patches', subcategories: [] },
    { name: 'Pedido Especial', subcategories: [] },
  ]);

  // ... restante da implementação existente ...
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personalizar Produto</h1>
      
      {/* Seletor de Categoria */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Categoria</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(index)}
              className={`px-4 py-2 rounded ${
                selectedCategory === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Seletor de Subcategoria (modelo) */}
      {selectedCategory !== null && categories[selectedCategory]?.subcategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Modelo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories[selectedCategory].subcategories.map((sub, index) => (
              <button
                key={sub.name}
                onClick={() => setSelectedSubcategory(sub)}
                className={`p-4 border rounded-lg text-center ${
                  selectedSubcategory?.name === sub.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Seletor de Cor */}
      {selectedSubcategory && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Cor</h2>
          <select className="w-full p-2 border rounded">
            <option value="">Selecione uma cor</option>
            {COLOR_ORDER.map((code) => (
              <option key={code} value={code}>
                {COLOR_NAMES[code]}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
