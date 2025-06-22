"use client";

import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Images } from "./Images";

interface Product {
  images: string[];
  name: string;
}

interface ProductImagesProps {
  product: Product;
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  if (!product.images || product.images.length === 0) {
    return (
      <div className="flex flex-wrap justify-between gap-8">
        <div className="grow-999 basis-0">
          <div className="flex lg:hidden justify-center items-center min-h-[400px]">
            <div className="relative w-[250px] rounded-md overflow-hidden" role="region" aria-roledescription="carousel">
              <div className="overflow-hidden">
                <div className="flex">
                  <div
                    className="min-w-0 shrink-0 grow-0 basis-full"
                    role="group"
                    aria-roledescription="slide"
                  >
                    <div className="relative">
                      <Images
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={250}
                        height={375}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between">
      <div className="grow-999 basis-0">
        <div className="flex lg:hidden justify-center items-center min-h-[400px]">
          <div className="relative w-[250px] rounded-md overflow-hidden" role="region" aria-roledescription="carousel">
            <div className="overflow-hidden">
              <div className="flex">
                <div
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  role="group"
                  aria-roledescription="slide"
                >
                  <div className="relative">
                    <Images
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      width={250}
                      height={375}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:grid hidden grid-cols-2 gap-0.5 min-w-grid-img">
        {product.images.map((image, index) => (
          <div key={index} className="inline-block w-full max-w-2xl mx-auto overflow-hidden rounded">
            <div className="relative">
              <Images
                src={image}
                alt={product.name}
                className="w-full h-full object-cover"
                width={850}
                height={1275}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
