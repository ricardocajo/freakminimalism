"use client";

import { useCallback } from "react";
import { CartItem } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";

interface ProductCartInfoProps {
  cartItem: CartItem;
}

export const ProductCartInfo = ({ cartItem }: ProductCartInfoProps) => {
  const { addToCart, decrementQuantity } = useCart();

  const handleDelOneItem = useCallback(() => {
    decrementQuantity(cartItem._id);
  }, [cartItem._id, decrementQuantity]);

  const handleAddItem = useCallback(() => {
    addToCart(cartItem);
  }, [cartItem, addToCart]);

  const DecrementButton = () => (
    <button
      className="flex items-center justify-center w-8 h-8 p-2 border border-solid rounded-l text-[#A1A1A1] transition-all hover:text-white border-border-primary"
      onClick={handleDelOneItem}
    >
      -
    </button>
  );

  const IncrementButton = () => (
    <button
      className="flex items-center justify-center w-8 h-8 p-2 border border-solid rounded-r text-[#A1A1A1] transition-all hover:text-white border-border-primary"
      onClick={handleAddItem}
    >
      +
    </button>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium">{cartItem.name}</p>
          <p className="text-sm text-gray-500">{cartItem.color}</p>
          <p className="text-sm text-gray-500">{cartItem.size}</p>
        </div>
        <div className="flex items-center gap-2">
          <DecrementButton />
          <p className="text-sm font-medium">{cartItem.quantity}</p>
          <IncrementButton />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{cartItem.price}€</p>
        <p className="text-sm font-medium">{(cartItem.price * cartItem.quantity).toFixed(2)}€</p>
      </div>
    </div>
  );
}
