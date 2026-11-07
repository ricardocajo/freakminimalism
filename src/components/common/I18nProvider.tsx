"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

const STORAGE_KEY = "i18nextLng";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // i18n starts in Portuguese to match the server HTML. Once hydrated, switch
  // to the visitor's saved choice or browser language, then remember any
  // later change (e.g. from the language switcher).
  useEffect(() => {
    // Wait for the page to finish loading and the browser to go idle, so the
    // streamed Suspense boundaries (Navbar, product grid) hydrate in
    // Portuguese first; switching earlier makes their hydration mismatch.
    let idleId: number | undefined;
    const applyDetected = () => {
      const detected = i18n.services.languageDetector?.detect();
      const lang = Array.isArray(detected) ? detected[0] : detected;
      if (lang && !lang.toLowerCase().startsWith(i18n.language)) {
        i18n.changeLanguage(lang);
      }
    };
    const schedule = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(applyDetected, { timeout: 1000 })
        : window.setTimeout(applyDetected, 200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    const remember = (lng: string) => {
      try {
        localStorage.setItem(STORAGE_KEY, lng);
      } catch {
        // Storage blocked (private mode): the choice just won't persist.
      }
    };
    i18n.on("languageChanged", remember);
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      }
      i18n.off("languageChanged", remember);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
