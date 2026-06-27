"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { type Product } from "@/lib/products";
import { price } from "@/lib/format";
import { EASE_LUXE } from "@/lib/motion";
import { useT } from "@/lib/i18n/LocaleProvider";

export type Hotspot = {
  slug: string;
  /** Position over the image, as % of width/height. */
  x: number;
  y: number;
};

export function ShopTheLook({
  image,
  imageAlt,
  products,
  hotspots,
}: {
  image: string;
  imageAlt: string;
  products: Product[];
  hotspots: Hotspot[];
}) {
  const t = useT();
  const [active, setActive] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const focusProduct = (slug: string) => {
    setActive(slug);
    rowRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const bySlug = (slug: string) => products.find((p) => p.slug === slug);

  return (
    <div className="container-luxe grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Editorial image with interactive hotspots */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_LUXE }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_30%]"
          />
          <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-luxe text-ink backdrop-blur">
            {t("look.badge")}
          </span>

          {hotspots.map((h) => {
            const p = bySlug(h.slug);
            if (!p) return null;
            const isActive = active === h.slug;
            return (
              <div
                key={h.slug}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <button
                  type="button"
                  onClick={() => focusProduct(h.slug)}
                  onMouseEnter={() => setActive(h.slug)}
                  aria-label={`Shop ${p.name}`}
                  className="relative grid h-7 w-7 place-items-center rounded-full bg-cream text-ink shadow-lift"
                >
                  {/* pulsing ring */}
                  <span className="absolute inset-0 animate-ping rounded-full bg-cream/70" />
                  <Plus
                    className={`relative h-4 w-4 transition-transform duration-300 ${
                      isActive ? "rotate-45" : ""
                    }`}
                  />
                </button>

                {/* hover/active tooltip card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: EASE_LUXE }}
                      className="absolute left-1/2 top-9 z-20 w-44 -translate-x-1/2 rounded-lg bg-cream p-2 shadow-lift"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-sand">
                          <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-serif text-sm leading-tight text-ink">
                            {p.name}
                          </p>
                          <p className="text-xs tabular-nums text-stone">{price(p.price)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Copy + shop-the-look list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_LUXE, delay: 0.1 }}
      >
        <p className="eyebrow mb-3">{t("look.eyebrow")}</p>
        <h2 className="h-display text-4xl text-ink sm:text-5xl">
          {t("look.title1")}
          <br />
          <span className="italic text-gold-deep">{t("look.title2")}</span>
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-stone">{t("look.body")}</p>

        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {products.map((p) => (
            <li
              key={p.slug}
              ref={(el) => {
                rowRefs.current[p.slug] = el;
              }}
            >
              <Link
                href={`/product/${p.slug}`}
                onMouseEnter={() => setActive(p.slug)}
                onMouseLeave={() => setActive(null)}
                className={`group flex items-center gap-4 rounded-md px-2 py-4 transition-colors ${
                  active === p.slug ? "bg-cream ring-1 ring-gold/40" : "hover:bg-cream/60"
                }`}
              >
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-sand">
                  <Image src={p.images[0]} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-stone">{p.brand}</p>
                  <p className="truncate font-serif text-lg text-ink">{p.name}</p>
                </div>
                <span className="font-medium tabular-nums text-ink">{price(p.price)}</span>
                <ArrowRight className="h-4 w-4 text-stone transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/shop" className="btn-primary mt-8">
          {t("look.shopAll")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
