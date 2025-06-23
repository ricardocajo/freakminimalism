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
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[^\w\s]/g, '')
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
          const normalizedSearch = normalizeText(searchTerm).trim();
          const normalizedEnName = normalizeText(product.translations.en.name);
          const normalizedPtName = normalizeText(product.translations.pt.name);
          
          // Check if search term matches either English or Portuguese name
          // Also check if the search term is a substring of the product name
          return (
            normalizedEnName.includes(normalizedSearch) || 
            normalizedPtName.includes(normalizedSearch) ||
            normalizedSearch.includes(normalizedEnName) ||
            normalizedSearch.includes(normalizedPtName)
          );
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
    <section>
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm text-[#A1A1A1]">◐ 𝔇𝔦𝔣𝔣𝔢𝔯𝔢𝔫𝔱 𝔳𝔦𝔰𝔦𝔬𝔫, 𝔡𝔦𝔣𝔣𝔢𝔫𝔱 𝔰𝔱𝔶𝔩𝔢 ◑</span>
            <Link href="/customize" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white rounded-full hover:from-[#00A1CE] hover:to-[#007195] transition-all">
              Envia-nos a tua ideia
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Search Results</h1>
          <div className="grid gap-x-3.5 gap-y-6 sm:gap-y-9 sm:grid-cols-auto-fill-250">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="flex justify-between border border-solid border-border-primary rounded-md overflow-hidden flex-col">
                  <Link href={`/products/${product._id}`} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:scale-[1.02]">
                    <div className="relative">
                      <div className="relative w-full max-w-img aspect-[2/3] brightness-90">
                        <Image
                          src={product.images[0]}
                          alt={product.translations.en.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-between flex-col gap-2.5 p-3.5 bg-background-secondary z-10">
                    <div className="flex justify-between w-full">
                      <Link href={`/products/${product._id}`} className="w-10/12">
                        <h2 className="text-sm font-semibold truncate">{product.translations.en.name}</h2>
                      </Link>
                      {product.discountPrice && (
                        <span className="flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-[#E53E3E] rounded-full">
                          {(((product.price - product.discountPrice) / product.price) * 100).toFixed(0)}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {product.discountPrice ? (
                        <>
                          <span className="text-sm line-through text-[#A1A1A1]">{product.price}€</span>
                          <span className="text-sm font-semibold">{product.discountPrice}€</span>
                        </>
                      ) : (
                        <span className="text-sm">{product.price}€</span>
                      )}
                    </div>
                  </div>
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
      </div>
    </section>
  );
};

export default Search;
