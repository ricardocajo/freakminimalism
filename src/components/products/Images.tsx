"use client";

import Image from "next/image";

interface ImagesProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export const Images = ({
  src,
  alt,
  className,
  width = 500,
  height = 750,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
}: ImagesProps) => {
  return (
    <div className={`relative ${className || ""} w-full h-full bg-transparent`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="object-contain bg-transparent"
      />
    </div>
  );
};
