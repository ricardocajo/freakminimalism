"use client";

import { useCallback, useTransition } from "react";
import { Loader } from "../common/Loader";
import { toast } from "sonner";
import { CartItem } from "@/contexts/CartContext";

interface ButtonCheckoutProps {
  cartItems: CartItem[];
  promoCode?: string;
}

export const ButtonCheckout = ({ cartItems, promoCode }: ButtonCheckoutProps) => {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = useCallback(async () => {
    try {
      const res = await fetch("/api/stripe/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, promoCode }),
      });
      if (!res.ok) {
        throw new Error(`Checkout failed (${res.status})`);
      }
      const { url } = await res.json();
      if (!url) {
        throw new Error("Missing checkout URL");
      }
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to create checkout session");
    }
  }, [cartItems, promoCode]);

  return (
    <button
      onClick={() => startTransition(handleCheckout)}
      disabled={isPending}
      className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? <Loader height={20} width={20} /> : "Checkout"}
    </button>
  );
};

export default ButtonCheckout;
