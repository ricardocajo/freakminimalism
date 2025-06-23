"use client";

import Image from "next/image";
import { Product, CartItem } from "@/types/types";
import { useTranslation } from "react-i18next";
import { useState } from "react";


interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { i18n } = useTranslation();
  const language = i18n.language as 'en' | 'pt';
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      _id: product._id,
      name: product.translations[language].name,
      price: product.price,
      discountPrice: product.discountPrice || undefined,
      color: selectedColor,
      size: selectedSize,
      image: product.images[0],
      quantity: 1,
      stripePriceId: product._id // Using product ID as stripePriceId for now
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <Image
          src={product.images[0]}
          alt={product.translations[language].name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{product.translations[language].name}</h3>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-1">Color</span>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-1">Size</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{product.discountPrice ? `${product.discountPrice}€` : `${product.price}€`}</span>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {i18n.t('add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
}
