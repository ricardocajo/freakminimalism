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

export const Images = ({ src, alt, className, width = 800, height = 1200 }: ImagesProps) => {
  return (
    <div className={`relative ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized={true}
        className="object-cover"
      />
    </div>
  );
}
