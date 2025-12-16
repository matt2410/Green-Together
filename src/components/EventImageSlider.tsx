"use client";

import { optimizeUnsplash } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function EventImageSlider({ images }: Props) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full h-64 rounded overflow-hidden">
      <Image
        src={optimizeUnsplash(images[index])}
        alt={`event-image-${index}`}
        fill
        className="object-cover"
        priority
      />

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
