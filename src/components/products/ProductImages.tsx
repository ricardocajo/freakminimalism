"use client";

import { Images } from "./Images";
import { MobileGallery } from "./MobileGallery";
import { Product } from "@/types/types";
import { useTranslation } from "react-i18next";
import { resolveLang } from "@/libs/utils";

interface ProductImagesProps {
  product: Product;
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  const { i18n } = useTranslation();
  const language = resolveLang(i18n.language);
  const alt = product.translations[language].name;

  if (!product.images || product.images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between">
      {/* Phone: swipeable track carrying every image */}
      <div className="grow-999 basis-0 lg:hidden">
        <MobileGallery images={product.images} alt={alt} />
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
