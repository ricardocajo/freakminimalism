"use client";

import axios from "axios";
import { useTransition, useCallback, useMemo } from "react";
import { Loader } from "../common/Loader";
import { toast } from "sonner";
import { CartItem } from "@/contexts/CartContext";

interface ButtonCheckoutProps {
  cartItems: CartItem[];
}

export const ButtonCheckout = ({ cartItems }: ButtonCheckoutProps) => {
  const [isPending, startTransition] = useTransition();

  const lineItems = useMemo(
    () =>
      cartItems.map((item) => ({
        price: item._id, // Using _id as the Stripe price ID
        quantity: item.quantity,
      })),
    [cartItems]
  );

  const handleCheckout = useCallback(async () => {
    try {
      const response = await axios.post("/api/stripe/checkout_sessions", { cartItems });
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to create checkout session");
    }
  }, [lineItems]);

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
