"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface ImagesProps {
  src: string;
  alt: string;
  className?: string;
}

interface ImagesProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Images = ({ src, alt, className }: ImagesProps) => {
  return (
    <div className={`relative ${className || ''} w-full h-full bg-transparent`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={true}
        className="object-contain bg-transparent"
      />
    </div>
  );
}
