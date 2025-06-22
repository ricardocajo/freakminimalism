"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CheckoutButton = () => {
  const { cart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cart }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || cart.length === 0}
      className="w-full px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
    </button>
  );
}
