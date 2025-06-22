"use client";

import React from "react";
import { useTransition, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/contexts/CartContext";
import { Product } from "@/types/types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface AddToCartProps {
  product: Product;
  selectedColor: string;
  selectedSize: string | null;
}

export const AddToCart = ({
  product,
  selectedColor,
  selectedSize,
}: AddToCartProps) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      toast.error(t('products.no_size_message'));
      return;
    }

    const cartItem: CartItem = {
      _id: product._id,
      name: product.translations[i18n.language as 'en' | 'pt'].name,
      price: product.price,
      discountPrice: product.discountPrice,
      color: selectedColor,
      size: selectedSize,
      image: product.images[0],
      quantity: 1,
    };

    startTransition(() => {
      addToCart(cartItem);
      toast.success(t('cart.added_to_cart'));
    });
  }, [product, selectedColor, selectedSize, addToCart, t]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">{t('productDetails.color')}: {selectedColor}</span>
      </div>
      <button
        className="w-full px-4 py-2 text-white bg-black rounded hover:bg-gray-800 transition-colors"
        onClick={handleAddToCart}
      >
        {isPending ? t('cart.adding_to_cart') : t('cart.add_to_cart')}
      </button>
    </div>
  );
}
