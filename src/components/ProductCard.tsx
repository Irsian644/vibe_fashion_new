"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Eye } from "lucide-react";
import { type Product, discountPct } from "@/lib/products";
import { price } from "@/lib/format";
import { StarRating } from "./StarRating";
import { QuickView } from "./QuickView";
import { WishlistHeart } from "./WishlistHeart";
import { useTilt } from "@/lib/interactions";
import { useT } from "@/lib/i18n/LocaleProvider";

// Builds a MotionValue<string> radial-gradient that follows the cursor.
function useGlare(x: MotionValue<string>, y: MotionValue<string>): MotionValue<string> {
  return useTransform(
    [x, y],
    ([gx, gy]: string[]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%)`,
  );
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const t = useT();
  const off = discountPct(product);
  const hoverImg = product.images[1];
  const [quickOpen, setQuickOpen] = useState(false);
  const tilt = useTilt<HTMLDivElement>(7);
  const glare = useGlare(tilt.glareX, tilt.glareY);

  return (
    <div className="group relative">
      {/* Tilt + glare stage. perspective lives on the wrapper, the inner
          card rotates in 3D and a cursor-tracked highlight rides on top. */}
      <div style={{ perspective: 900 }}>
        <motion.div
          ref={tilt.ref}
          onPointerMove={tilt.onPointerMove}
          onPointerLeave={tilt.onPointerLeave}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
          className="[will-change:transform]"
        >
          <Link
            href={`/product/${product.slug}`}
            className="block"
            aria-label={`${product.name} by ${product.brand}, ${price(product.price)}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-sand">
              <Image
                src={product.images[0]}
                alt={`${product.name} — ${product.brand}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                className={`object-cover transition-all duration-700 ease-luxe group-hover:scale-[1.04] ${
                  hoverImg ? "group-hover:opacity-0" : ""
                }`}
              />
              {hoverImg && (
                <Image
                  src={hoverImg}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100"
                />
              )}

              {/* Cursor-following glare */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ opacity: tilt.glareOpacity, background: glare }}
              />

              {/* Badges — discount only shows if a real compareAt is set;
                  low-stock badge only if a real stock count is provided. */}
              <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                {off && (
                  <span className="rounded-full bg-sale px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    −{off}%
                  </span>
                )}
                {product.isNew && !off && (
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
                    New
                  </span>
                )}
              </div>

              {typeof product.stock === "number" && product.stock <= 3 && (
                <span className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-sale backdrop-blur">
                  {t("pdp.onlyLeft", { n: product.stock })}
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Wishlist — bounce + gold burst + fly-to-heart */}
      <WishlistHeart slug={product.slug} image={product.images[0]} />

      {/* Quick view — slides up on hover (desktop) */}
      <button
        type="button"
        onClick={() => setQuickOpen(true)}
        aria-label={`${t("cta.quickView")} ${product.name}`}
        className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center gap-2 rounded-full bg-ink/90 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-cream opacity-0 backdrop-blur transition-all duration-300 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      >
        <Eye className="h-4 w-4" /> {t("cta.quickView")}
      </button>

      <QuickView product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />

      {/* Info */}
      <div className="mt-3 px-0.5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-stone">{product.brand}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-0.5 font-serif text-lg leading-tight text-ink hover:text-charcoal">
            {product.name}
          </h3>
        </Link>
        {typeof product.rating === "number" && (
          <div className="mt-1.5">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-medium tabular-nums text-ink">{price(product.price)}</span>
          {product.compareAt && (
            <span className="text-sm tabular-nums text-taupe line-through">
              {price(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
