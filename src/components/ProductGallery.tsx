"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const hasMany = images.length > 1;

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + images.length) % images.length);

  return (
    <>
      <div className="flex flex-col-reverse gap-3 lg:flex-row">
        {/* Thumbnails */}
        {hasMany && (
          <div className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-sand transition-all lg:h-24 lg:w-20 ${
                  i === active ? "ring-2 ring-ink ring-offset-2 ring-offset-cream" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="relative flex-1">
          <div
            className="group relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-lg bg-sand"
            onClick={() => setZoomOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[active]}
                  alt={`${name} — image ${active + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>

            <span className="pointer-events-none absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/85 text-ink backdrop-blur">
              <ZoomIn className="h-[18px] w-[18px]" />
            </span>

            {hasMany && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Zoom lightbox */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
              aria-label="Close zoom"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              className="relative h-[82vh] w-full max-w-3xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={`${name} — enlarged`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
