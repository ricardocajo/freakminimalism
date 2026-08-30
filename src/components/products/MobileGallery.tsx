"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Images } from "./Images";

interface MobileGalleryProps {
  images: string[];
  alt: string;
}

/**
 * Phone gallery: every product image on one horizontally snapping track.
 * Slides are narrower than the viewport so the next one peeks in from the
 * edge — with most products carrying only two images, that sliver is the
 * only thing telling the visitor there is more to swipe to.
 */
export const MobileGallery = ({ images, alt }: MobileGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The active slide is derived from scroll position, not from dot clicks:
  // swiping is the primary gesture and the dots are only a fallback, so the
  // scroll offset is the single source of truth for both.
  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackBox = track.getBoundingClientRect();
    const center = trackBox.left + trackBox.width / 2;
    let closest = 0;
    let shortest = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const box = child.getBoundingClientRect();
      const distance = Math.abs(box.left + box.width / 2 - center);
      if (distance < shortest) {
        shortest = distance;
        closest = index;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      // Momentum scrolling on iOS fires this far faster than we need to
      // repaint the dots, so coalesce to one measurement per frame.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncActive();
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [syncActive]);

  const goTo = (index: number) => {
    const slide = trackRef.current?.children[index];
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={alt}
        className="flex gap-3 px-[11%] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={image}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${images.length}`}
            className="shrink-0 basis-full overflow-hidden rounded-md snap-center"
          >
            <Images
              src={image}
              alt={alt}
              width={780}
              height={1170}
              priority={index === 0}
              sizes="78vw"
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${alt} — ${index + 1} / ${images.length}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all duration-200 ease ${
                index === active ? "w-6 bg-white" : "w-1.5 bg-[#4A4A4A]"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
