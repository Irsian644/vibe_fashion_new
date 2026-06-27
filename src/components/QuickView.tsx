"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, ArrowRight } from "lucide-react";
import { type Product, discountPct } from "@/lib/products";
import { price } from "@/lib/format";
import { site } from "@/lib/site";
import { useWishlist } from "./WishlistProvider";
import { InstagramOrderButton } from "./InstagramOrderButton";
import { StarRating } from "./StarRating";
import { useT } from "@/lib/i18n/LocaleProvider";

export function QuickView({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const t = useT();
  const { has, toggle } = useWishlist();
  const off = discountPct(product);
  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const wished = has(product.slug);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const message = [
    t("dm.greeting", { name: site.name }),
    `• ${product.name} (${product.brand})`,
    color ? `• ${t("common.colour")}: ${color}` : "",
    size ? `• ${t("common.size")}: ${size}` : "",
    `• ${t("dm.price")}: ${price(product.price)}`,
    ``,
    `${t("dm.link")}: ${site.url}/product/${product.slug}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[120] bg-ink/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[130] mx-auto max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-cream sm:inset-y-0 sm:my-auto sm:max-h-[88vh] sm:rounded-2xl"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/80 text-ink backdrop-blur hover:bg-sand"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-[3/4] bg-sand sm:aspect-auto">
                <Image
                  src={product.images[0]}
                  alt={`${product.name} — ${product.brand}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
                {off && (
                  <span className="absolute left-3 top-3 rounded-full bg-sale px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    −{off}%
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.16em] text-stone">{product.brand}</p>
                <h2 className="mt-1.5 font-serif text-3xl leading-tight text-ink">{product.name}</h2>
                {typeof product.rating === "number" && (
                  <div className="mt-2">
                    <StarRating rating={product.rating} reviews={product.reviews} />
                  </div>
                )}

                <div className="mt-4 flex items-baseline gap-2.5">
                  <span className="font-serif text-2xl text-ink">{price(product.price)}</span>
                  {product.compareAt && (
                    <span className="text-base text-taupe line-through">{price(product.compareAt)}</span>
                  )}
                </div>

                {typeof product.stock === "number" && product.stock <= 3 && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-sale/10 px-3 py-1.5 text-sm font-medium text-sale">
                    {t("pdp.onlyLeft", { n: product.stock })}
                  </p>
                )}

                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-charcoal">
                  {product.description}
                </p>

                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-medium text-stone">{t("common.colour")}: {color}</p>
                    <div className="mt-2 flex gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setColor(c.name)}
                          aria-label={c.name}
                          aria-pressed={color === c.name}
                          className={`h-8 w-8 rounded-full border transition-all ${
                            color === c.name
                              ? "ring-2 ring-ink ring-offset-2 ring-offset-cream"
                              : "border-ink/15 hover:scale-110"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-medium text-stone">{t("common.size")}: {size}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSize(s)}
                          aria-pressed={size === s}
                          className={`min-h-[40px] min-w-[40px] rounded-md border px-3 text-sm transition-colors ${
                            size === s
                              ? "border-ink bg-ink text-cream"
                              : "border-ink/20 text-charcoal hover:border-ink"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-2.5">
                  <InstagramOrderButton message={message} className="btn-instagram w-full">
                    {t("cta.orderInstagram")}
                  </InstagramOrderButton>
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggle(product.slug)}
                      className={`btn-outline flex-1 ${wished ? "border-sale text-sale" : ""}`}
                    >
                      <Heart className={`h-[18px] w-[18px] ${wished ? "fill-current" : ""}`} />
                      {wished ? t("qv.saved") : t("qv.save")}
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="btn-outline flex-1"
                    >
                      {t("qv.details")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
