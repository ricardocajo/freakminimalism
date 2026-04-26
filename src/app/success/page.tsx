"use client";

import { Suspense, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const SuccessHandler = () => {
  const { emptyCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    // Stripe redirects here with ?session_id=cs_... — without it, treat the
    // visit as a direct hit and don't touch the cart.
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      router.replace("/");
      return;
    }

    emptyCart();
    toast.success("Payment successful! Your order has been placed.");
    const redirect = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(redirect);
  }, [router, emptyCart, searchParams]);

  return null;
};

export default function SuccessPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-8">
          Thank you for your purchase. You will be redirected to the home page shortly.
        </p>
      </div>
      <Suspense fallback={null}>
        <SuccessHandler />
      </Suspense>
    </div>
  );
}
