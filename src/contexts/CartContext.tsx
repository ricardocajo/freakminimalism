"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Product, type CartItem } from "@/types/types";

export type { CartItem };

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  decrementQuantity: (itemId: string) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = typeof window !== 'undefined' ? localStorage.getItem("cart") : null;
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const total = cart.reduce((sum, item) => {
    const price = item.discountPrice ? item.discountPrice : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => 
      cartItem._id === item._id && 
      cartItem.color === item.color && 
      cartItem.size === item.size
    );

    if (existingItem) {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem._id === item._id && 
          cartItem.color === item.color && 
          cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prev) => prev.filter((cartItem) => 
      !(cartItem._id === item._id && 
        cartItem.color === item.color && 
        cartItem.size === item.size)
    ));
  };

  const decrementQuantity = (itemId: string) => {
    const item = cart.find((cartItem) => cartItem._id === itemId);
    if (item && item.quantity > 1) {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem._id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else if (item) {
      removeFromCart(item);
    }
  };

  const emptyCart = () => {
    setCart([]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        addToCart,
        removeFromCart,
        decrementQuantity,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return {
    ...context,
    total: context.cart.reduce((sum, item) => {
      const price = item.discountPrice ? item.discountPrice : item.price;
      return sum + (price * item.quantity);
    }, 0)
  };
}
