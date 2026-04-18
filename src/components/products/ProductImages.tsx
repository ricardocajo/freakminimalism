"use client";

import { Images } from "./Images";
import { Product } from "@/types/types";
import { useTranslation } from "react-i18next";

interface ProductImagesProps {
  product: Product;
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  const { i18n } = useTranslation();
  const language = i18n.language as "en" | "pt";
  const alt = product.translations[language].name;

  if (!product.images || product.images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between">
      {/* Mobile: single hero image */}
      <div className="grow-999 basis-0 lg:hidden">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="relative w-[280px] rounded-md overflow-hidden">
            <Images
              src={product.images[0]}
              alt={alt}
              width={560}
              height={840}
              priority
              sizes="(max-width: 640px) 80vw, 280px"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Desktop: two-column gallery of all images */}
      <div className="lg:grid hidden grid-cols-2 gap-0.5 min-w-grid-img">
        {product.images.map((image, index) => (
          <div
            key={index}
            className="inline-block w-full max-w-2xl mx-auto overflow-hidden rounded"
          >
            <Images
              src={image}
              alt={alt}
              width={850}
              height={1275}
              priority={index === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
