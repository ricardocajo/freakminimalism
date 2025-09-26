"use client";

import Link from "next/link";
import { Images } from "./Images";
import { Product } from "@/types/types";
import { useTranslation } from "react-i18next";

interface ProductsProps {
  products: Product[];
  extraClassname?: string;
}

export const Products = ({ products, extraClassname = "" }: ProductsProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'en' | 'pt';
  const showCustomization = extraClassname.startsWith('category-') || extraClassname === '';
  const gridClassname = [
    "grid gap-x-3.5 gap-y-6 sm:gap-y-9",
    extraClassname === "colums-mobile" && "grid-cols-auto-fill-110",
    extraClassname === "cart-ord-mobile" && "grid-cols-1",
    "sm:grid-cols-auto-fill-250",
  ]
    .filter(Boolean)
    .join(" ");

  // Only filter products by category if extraClassname starts with 'category-'
  const filteredProducts = extraClassname.startsWith('category-') 
    ? products.filter((product: Product) => {
        // Get the category from extraClassname (remove 'category-')
        const category = extraClassname.replace('category-', '').toLowerCase();
        
        // Normalize all product categories to lowercase for comparison
        const productCategories = product.categories.map(cat => cat.toLowerCase());
        
        // Check if the category matches any of the product's categories
        return productCategories.includes(category);
      })
    : products;

  return (
    <div className="flex flex-col gap-6 mt-4">
      {showCustomization && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/customize"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white rounded-full hover:from-[#00A1CE] hover:to-[#007195] transition-all"
            >
              Envia-nos a tua ideia
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
      <div className={gridClassname + " " + extraClassname}>
        {filteredProducts.map((product: Product) => (
          <div key={product._id} className="flex justify-between border border-solid border-border-primary rounded-md overflow-hidden flex-col">
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:scale-[1.02]"
            >
              <div className="relative w-full aspect-[2/3] h-full bg-transparent">
                <Images
                  src={product.images[0]}
                  alt={product.translations[language].name}
                  className="brightness-90 bg-transparent"
                />
              </div>
            </Link>
            <div className="flex justify-between flex-col gap-2.5 p-3.5 bg-background-secondary z-10">
              <div className="flex justify-between w-full">
                <Link href={`/products/${product._id}`} className="w-10/12">
                  <h2 className="text-sm font-semibold truncate">{product.translations[language].name}</h2>
                </Link>
                {product.discountPrice && (
                  <span className="flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-[#E53E3E] rounded-full">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                )}
              </div>
              {product.discountPrice ? (
                <div className="flex items-center gap-1">
                  <span className="text-sm line-through text-[#A1A1A1]">{product.price}€</span>
                  <span className="text-sm font-semibold">{product.discountPrice}€</span>
                </div>
              ) : (
                <span className="text-sm">{product.price}€</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
