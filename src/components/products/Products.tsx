"use client";

import Link from "next/link";
import { Images } from "./Images";
import { Product } from "@/types/types";
import { useTranslation } from "react-i18next";
import { resolveLang } from "@/libs/utils";

interface ProductsProps {
  products: Product[];
  extraClassname?: string;
}

export const Products = ({ products, extraClassname = "" }: ProductsProps) => {
  const { t, i18n } = useTranslation();
  const language = resolveLang(i18n.language);
  const showCustomization =
    extraClassname.startsWith("category-") || extraClassname === "";

  const gridClassname = [
    "grid gap-x-3.5 gap-y-6 sm:gap-y-9",
    extraClassname === "colums-mobile" && "grid-cols-auto-fill-110",
    extraClassname === "cart-ord-mobile" && "grid-cols-1",
    "sm:grid-cols-auto-fill-250",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-6 mt-4">
      {showCustomization && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/customize"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white rounded-full hover:from-[#00A1CE] hover:to-[#007195] transition-all"
            >
              {t("products.customizeButton")}
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
      <div className={gridClassname + " " + extraClassname}>
        {products.map((product) => {
          const name = product.translations[language].name;
          const hasDiscount = Boolean(product.discountPrice);
          const discountPct = hasDiscount
            ? Math.round(
                ((product.price - (product.discountPrice as number)) /
                  product.price) *
                  100,
              )
            : 0;
          return (
            <div
              key={product._id}
              className="group relative flex flex-col justify-between border border-solid border-border-primary rounded-lg overflow-hidden bg-background-secondary transition-all duration-200 hover:border-[#3a3a3a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              {hasDiscount && (
                <span className="absolute top-2 left-2 z-10 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-white bg-[#E53E3E] rounded-full shadow-md">
                  -{discountPct}%
                </span>
              )}
              <Link
                href={`/${product.categories[0] || "new"}/${product._id}`}
                aria-label={name}
                className="flex flex-col overflow-hidden"
              >
                <div className="relative w-full aspect-[2/3] bg-transparent overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                    <Images
                      src={product.images[0]}
                      alt={name}
                      className="brightness-95 group-hover:brightness-100 transition duration-200"
                    />
                  </div>
                </div>
              </Link>
              <div className="flex flex-col gap-1.5 px-3.5 py-3 border-t border-border-primary">
                <Link href={`/${product.categories[0] || "new"}/${product._id}`} className="min-w-0">
                  <h2 className="text-sm font-semibold truncate">{name}</h2>
                </Link>
                {hasDiscount ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">
                      {product.discountPrice}€
                    </span>
                    <span className="text-xs line-through text-[#7F7F7F]">
                      {product.price}€
                    </span>
                  </div>
                ) : (
                  <span className="text-sm">{product.price}€</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
