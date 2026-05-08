"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// Stripe Checkout Session IDs always have the form `cs_test_...` or `cs_live_...`.
// We only accept that exact shape AND require sessionStorage idempotency so a
// shared "/success?session_id=foo" link can't clear another user's cart.
const STRIPE_SESSION_ID_RE = /^cs_(?:test|live)_[A-Za-z0-9]{20,}$/;
const PROCESSED_KEY = "fm.processedSessionIds";

function isProcessed(id: string) {
  try {
    const raw = sessionStorage.getItem(PROCESSED_KEY);
    if (!raw) return false;
    const list: string[] = JSON.parse(raw);
    return Array.isArray(list) && list.includes(id);
  } catch {
    return false;
  }
}

function markProcessed(id: string) {
  try {
    const raw = sessionStorage.getItem(PROCESSED_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    list.push(id);
    sessionStorage.setItem(PROCESSED_KEY, JSON.stringify(list.slice(-25)));
  } catch {
    /* sessionStorage may be blocked — best-effort only */
  }
}

const SuccessHandler = ({ onValid }: { onValid: () => void }) => {
  const { emptyCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const sessionId = searchParams.get("session_id");
    if (!sessionId || !STRIPE_SESSION_ID_RE.test(sessionId)) {
      router.replace("/");
      return;
    }

    onValid();

    // Idempotent: only empty the cart once per session id (covers strict-mode
    // double-mount, browser back/forward cache, accidental refresh, etc.).
    if (!isProcessed(sessionId)) {
      emptyCart();
      markProcessed(sessionId);
    }

    toast.success(t("successPage.toast"));
    const redirect = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(redirect);
  }, [router, emptyCart, searchParams, onValid, t]);

  return null;
};

export default function SuccessPage() {
  const [valid, setValid] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-12">
      {valid && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{t("successPage.title")}</h1>
          <p className="text-lg mb-8">{t("successPage.description")}</p>
        </div>
      )}
      <Suspense fallback={null}>
        <SuccessHandler onValid={() => setValid(true)} />
      </Suspense>
    </div>
  );
}
