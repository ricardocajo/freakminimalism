"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { type CartItem } from "@/types/types";

export type { CartItem };

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  decrementQuantity: (item: CartItem) => void;
  emptyCart: () => void;
}

const CART_STORAGE_KEY = "cart";

const sameVariant = (a: CartItem, b: CartItem) =>
  a._id === b._id && a.color === b.color && a.size === b.size;

const loadInitialCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const hydrated = useRef(false);

  // Hydrate from localStorage once on mount. Using a ref prevents the
  // persist effect from writing the empty default before hydration.
  useEffect(() => {
    setCart(loadInitialCart());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore quota / access errors
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => sameVariant(cartItem, item));
      if (existing) {
        return prev.map((cartItem) =>
          sameVariant(cartItem, item)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prev) => prev.filter((cartItem) => !sameVariant(cartItem, item)));
  };

  const decrementQuantity = (item: CartItem) => {
    setCart((prev) => {
      const target = prev.find((cartItem) => sameVariant(cartItem, item));
      if (!target) return prev;
      if (target.quantity <= 1) {
        return prev.filter((cartItem) => !sameVariant(cartItem, item));
      }
      return prev.map((cartItem) =>
        sameVariant(cartItem, item)
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      );
    });
  };

  const emptyCart = () => setCart([]);

  const { totalItems, total } = useMemo(() => {
    let items = 0;
    let sum = 0;
    for (const item of cart) {
      items += item.quantity;
      const price = item.discountPrice ?? item.price;
      sum += price * item.quantity;
    }
    return { totalItems: items, total: sum };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, totalItems, total, addToCart, removeFromCart, decrementQuantity, emptyCart }}
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
  return context;
}
