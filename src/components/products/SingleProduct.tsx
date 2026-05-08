"use client";

import { useState } from "react";
import { Product } from "@/types/types";
import { ProductImages } from "./ProductImages";
import { AddToCart } from "@/components/cart/AddToCart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { colorMapping } from "@/helpers/colorMapping";
import { resolveLang } from "@/libs/utils";

interface SingleProductProps {
  product: Product;
}

const toCssColor = (color: string) => colorMapping[color] ?? color;

export const SingleProduct = ({ product }: SingleProductProps) => {
  const { t, i18n } = useTranslation();
  const language = resolveLang(i18n.language);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length ? product.sizes[0] : null,
  );

  const { composition, care } = product.translations[language];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap justify-between gap-8">
        <div className="grow-999 basis-0">
          <ProductImages product={product} />
        </div>
        <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
          <div className="w-full border border-solid rounded border-border-primary bg-background-secondary">
            <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary">
              <h1 className="text-3xl font-bold">
                {product.translations[language].name}
              </h1>
              <p className="text-[#A1A1A1] text-sm">
                {product.translations[language].description}
              </p>
              <div className="flex items-center gap-3 mt-1">
                {product.discountPrice ? (
                  <>
                    <span className="text-base line-through text-[#7F7F7F]">
                      {product.price}€
                    </span>
                    <span className="text-lg font-semibold">
                      {product.discountPrice}€
                    </span>
                    <span className="ml-auto flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-[#E53E3E] rounded-full">
                      -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-semibold">{product.price}€</span>
                )}
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-4 gap-2.5 justify-center">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`flex items-center justify-center border border-solid px-1 py-1.5 rounded transition duration-150 ease text-13 ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "bg-black border-border-primary hover:border-border-secondary"
                    }`}
                  >
                    <span>{size}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                      aria-pressed={isSelected}
                      title={color}
                      className={`w-9 h-9 rounded-full transition-all duration-150 ease outline-none ring-offset-2 ring-offset-background-secondary ${
                        isSelected
                          ? "ring-2 ring-white scale-105"
                          : "ring-1 ring-border-primary hover:ring-border-secondary"
                      }`}
                      style={{ backgroundColor: toCssColor(color) }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="border-t border-solid border-border-primary">
              <AddToCart
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
              />
            </div>
          </div>
          <div className="w-full" data-orientation="vertical">
            <Accordion type="single" defaultValue="composition" collapsible>
              {composition ? (
                <AccordionItem value="composition" className="border-b border-[#2E2E2E]">
                  <AccordionTrigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>.lucide-chevron-down]:rotate-180 text-sm">
                    {t("productDetails.composition")}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 shrink-0" />
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden text-[#A1A1A1] text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    {composition}
                  </AccordionContent>
                </AccordionItem>
              ) : null}
              {care ? (
                <AccordionItem value="care" className="border-b border-[#2E2E2E]">
                  <AccordionTrigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>.lucide-chevron-down]:rotate-180 text-sm">
                    {t("productDetails.care")}
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 shrink-0" />
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden text-[#A1A1A1] text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    {care}
                  </AccordionContent>
                </AccordionItem>
              ) : null}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
