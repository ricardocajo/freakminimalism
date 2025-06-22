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

interface SingleProductProps {
  product: Product;
}

export const SingleProduct = ({ product }: SingleProductProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'en' | 'pt';
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const productName = product.translations[language].name;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap justify-between gap-8">
        <div className="grow-999 basis-0">
          <ProductImages product={product} />
        </div>
        <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
          <div className="w-full border border-solid rounded border-border-primary bg-background-secondary">
            <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary">
              <h1 className="text-3xl font-bold mb-4">{productName}</h1>
              <p className="text-gray-500 mb-6">{product.translations[language].description}</p>
              {product.discountPrice && (
                <span className="flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-[#E53E3E] rounded-full">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              )}
              {product.discountPrice ? (
                <div className="flex items-center gap-1">
                  <span className="text-sm line-through text-[#A1A1A1]">{product.price}€</span>
                  <span className="text-sm font-semibold">{product.discountPrice}€</span>
                </div>
              ) : (
                <span className="text-sm">{product.price}€</span>
              )}
            </div>
            <div className="p-5">
              <div className="grid grid-cols-4 gap-2.5 justify-center">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-center border border-solid border-border-primary px-1 py-1.5 bg-black rounded transition duration-150 ease text-13 ${
                      selectedSize === size
                        ? 'bg-white text-black hover:bg-white'
                        : 'hover:border-border-secondary'
                    }`}
                  >
                    <span>{size}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-auto-fill-32 gap-2.5 mt-5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border border-solid border-border-primary w-8 h-8 flex justify-center relative rounded transition duration-150 ease hover:border-border-secondary ${
                      selectedColor === color ? 'border-border-secondary' : ''
                    }`}
                    title={`Color ${color}`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <span className="w-2.5 absolute bottom-selected h-px bg-white"></span>
                    )}
                  </button>
                ))}
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
              <AccordionItem value="composition" className="border-b border-[#2E2E2E]">
                <AccordionTrigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>.lucide-chevron-down]:rotate-180 text-sm">
                  {t('productDetails.composition')}
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 shrink-0" />
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden text-[#A1A1A1] text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  {product.translations[language].composition}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care" className="border-b border-[#2E2E2E]">
                <AccordionTrigger className="flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>.lucide-chevron-down]:rotate-180 text-sm">
                  {t('productDetails.care')}
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 shrink-0" />
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden text-[#A1A1A1] text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  {product.translations[language].care}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
