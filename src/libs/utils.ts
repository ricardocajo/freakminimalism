import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveLang(lang: string | undefined): "en" | "pt" {
  if (!lang) return "en";
  if (lang === "pt" || lang.startsWith("pt-")) return "pt";
  return "en";
}
