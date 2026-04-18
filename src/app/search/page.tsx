"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { products as allProducts } from "@/data/products";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const normalizeText = (text: string): string => {
  if (!text) return "";
  return text.normalize("NFD").replace(/[^\w\s]/g, "").toLowerCase();
};

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { t, i18n } = useTranslation("common");
  const language = (i18n.language as "en" | "pt") || "pt";

  useEffect(() => {
    const normalizedSearch = normalizeText(query.trim());

    const filtered = allProducts.filter((product) => {
      const en = normalizeText(product.translations.en.name);
      const pt = normalizeText(product.translations.pt.name);

      return (
        en.includes(normalizedSearch) ||
        pt.includes(normalizedSearch) ||
        normalizedSearch.includes(en) ||
        normalizedSearch.includes(pt)
      );
    });

    setFilteredProducts(query ? filtered : allProducts);
  }, [query]);

  const heading = useMemo(() => t("search.results"), [t, language]);

  return (
    <section>
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm text-[#A1A1A1]">{t("products.customizeMessage")}</span>
            <Link
              href="/customize"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white rounded-full hover:from-[#00A1CE] hover:to-[#007195] transition-all"
            >
              {t("products.customizeButton")}
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">{heading}</h1>
          <div className="grid gap-x-3.5 gap-y-6 sm:gap-y-9 sm:grid-cols-auto-fill-250">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between border border-solid border-border-primary rounded-md overflow-hidden flex-col"
                >
                  <Link
                    href={`/products/${product._id}`}
                    className="flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:scale-[1.02]"
                  >
                    <div className="relative w-full aspect-[2/3] brightness-90">
                      <Image
                        src={product.images[0]}
                        alt={product.translations[language].name}
                        fill
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex justify-between flex-col gap-2.5 p-3.5 bg-background-secondary z-10">
                    <div className="flex justify-between w-full">
                      <Link href={`/products/${product._id}`} className="w-10/12">
                        <h2 className="text-sm font-semibold truncate">
                          {product.translations[language].name}
                        </h2>
                      </Link>
                      {product.discountPrice && (
                        <span className="flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-[#E53E3E] rounded-full">
                          {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {product.discountPrice ? (
                        <>
                          <span className="text-sm line-through text-[#A1A1A1]">{product.price}€</span>
                          <span className="text-sm font-semibold">{product.discountPrice}€</span>
                        </>
                      ) : (
                        <span className="text-sm">{product.price}€</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <h3 className="text-sm text-center mb-4">
                  {t("search.noResults", { query })}
                </h3>
                <Link href="/" className="text-sm font-medium text-primary hover:underline">
                  {t("search.backToHome")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
