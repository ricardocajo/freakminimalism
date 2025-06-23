"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SuccessPage() {
  const { emptyCart } = useCart();
  const router = useRouter();
  const [isCartCleared, setIsCartCleared] = useState(false);

  useEffect(() => {
    if (!isCartCleared) {
      emptyCart();
      toast.success("Payment successful! Your order has been placed.");
      setIsCartCleared(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [router]);

  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-8">Thank you for your purchase. You will be redirected to the home page shortly.</p>
      </div>
    </div>
  );
}
