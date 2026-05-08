"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { type CartItem } from "@/types/types";
import { products } from "@/data/products";
import { toast } from "sonner";

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

// Versioned schema so we can throw away old cart shapes when the type changes.
const CART_STORAGE_KEY = "cart";
const CART_SCHEMA_VERSION = 2;

const sameVariant = (a: CartItem, b: CartItem) =>
  a._id === b._id && a.color === b.color && a.size === b.size;

// Catalog lookup — re-derives display fields from the current products.ts so a
// user who edited their localStorage to set price=0 sees the canonical price.
const productById = new Map(products.map((p) => [p._id, p]));

function reconcile(item: CartItem): CartItem | null {
  const product = productById.get(item._id);
  if (!product) return null; // discarded: product no longer exists in catalog
  const qty = Math.max(1, Math.min(20, Number.isInteger(item.quantity) ? item.quantity : 1));
  // Prices come from the catalog, but sanity-check them anyway (negative or astronomically
  // large values would indicate a corrupted catalog entry rather than tampered storage).
  if (product.price < 0 || product.price > 10_000) return null;
  return {
    ...item,
    // Always pull these from the catalog, never trust localStorage:
    price: product.price,
    discountPrice: product.discountPrice,
    image: product.images[0] ?? item.image,
    quantity: qty,
  };
}

const loadInitialCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    // Old (pre-v2) shape was a bare array. New shape is { v, items }.
    let rawItems: unknown[] = [];
    if (Array.isArray(parsed)) {
      rawItems = parsed;
    } else if (parsed && parsed.v === CART_SCHEMA_VERSION && Array.isArray(parsed.items)) {
      rawItems = parsed.items;
    } else {
      return [];
    }
    return rawItems
      .filter((x): x is CartItem => !!x && typeof x === "object" && typeof (x as CartItem)._id === "string")
      .map(reconcile)
      .filter((x): x is CartItem => x !== null);
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
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ v: CART_SCHEMA_VERSION, items: cart }),
      );
    } catch (err) {
      if (err instanceof DOMException && err.name === "QuotaExceededError") {
        toast.error("O teu armazenamento local está cheio. O carrinho pode não ter sido guardado.");
      }
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    // Reconcile the incoming item against the catalog so a tampered call to
    // addToCart can't slip a fake price/name into the rendered cart.
    const reconciled = reconcile(item);
    if (!reconciled) return;
    setCart((prev) => {
      const existing = prev.find((cartItem) => sameVariant(cartItem, reconciled));
      if (existing) {
        return prev.map((cartItem) =>
          sameVariant(cartItem, reconciled)
            ? { ...cartItem, quantity: Math.min(20, cartItem.quantity + 1) }
            : cartItem,
        );
      }
      return [...prev, reconciled];
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
