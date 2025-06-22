"use client";

import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/types/types";

export default function ProductsPage() {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={(item: CartItem) => addToCart(item)}
          />
        ))}
      </div>
    </div>
  );
}
