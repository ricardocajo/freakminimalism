import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Picks which side of a product's `translations` to render.
 *
 * Portuguese is the default, matching i18next's `fallbackLng: 'pt'`. Falling
 * back to English here instead meant product names rendered in English before
 * language detection settled, and for every visitor whose browser locale was
 * not pt — even though the surrounding UI strings were already Portuguese.
 */
export function resolveLang(lang: string | undefined): "en" | "pt" {
  if (lang === "en" || lang?.startsWith("en-")) return "en";
  return "pt";
}
