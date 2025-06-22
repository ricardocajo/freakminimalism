"use client";

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '../actions';
import { Product } from '@/types/types';

interface SearchProps {
  searchParams: { [key: string]: string | undefined };
}

const normalizeText = (text: string): string => {
  return text
    .replace(/[-_]/g, "")
    .replace(/[^\w\s]/g, "")
    .toLowerCase();
};

const Search: React.FC<SearchProps> = ({ searchParams }) => {
  const products = getAllProducts();
  let filteredProducts: Product[] = [];

  if (products) {
    try {
      if (searchParams.q) {
        const searchTerm = searchParams.q as string;
        filteredProducts = products.filter((product) => {
          const normalizedSearch = normalizeText(searchTerm);
          const normalizedEnName = normalizeText(product.translations.en.name);
          const normalizedPtName = normalizeText(product.translations.pt.name);
          
          // Check if search term matches either English or Portuguese name
          return normalizedEnName.includes(normalizedSearch) || normalizedPtName.includes(normalizedSearch);
        });
      } else {
        filteredProducts = products;
      }
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  }

  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <Link href={`/products/${product._id}`} className="block">
                <div className="relative h-64">
                  <Image
                    src={product.images[0]}
                    alt={product.translations.en.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.translations.en.name}</h3>
                  <span className="text-sm">
                    {product.discountPrice ? `${product.discountPrice}€` : `${product.price}€`}
                  </span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <h3 className="text-sm text-center mb-4">
              {t('search.noResults', { query: searchParams.q })}
            </h3>
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t('search.backToHome')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
