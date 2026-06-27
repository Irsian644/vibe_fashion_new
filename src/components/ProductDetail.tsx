"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Truck, ShieldCheck, RotateCcw, Check, ChevronRight } from "lucide-react";
import { type Product, discountPct } from "@/lib/products";
import { price } from "@/lib/format";
import { site } from "@/lib/site";
import { useWishlist } from "./WishlistProvider";
import { ProductGallery } from "./ProductGallery";
import { InstagramOrderButton } from "./InstagramOrderButton";
import { StarRating } from "./StarRating";
import { Accordion } from "./Accordion";
import { useT } from "@/lib/i18n/LocaleProvider";

export function ProductDetail({ product }: { product: Product }) {
  const t = useT();
  const { has, toggle, addRecent } = useWishlist();
  const off = discountPct(product);
  const wished = has(product.slug);

  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    addRecent(product.slug);
  }, [product.slug, addRecent]);

  const message = useMemo(() => {
    const parts = [
      `${t("dm.greeting", { name: site.name })}`,
      `• ${product.name} (${product.brand})`,
      color ? `• ${t("common.colour")}: ${color}` : "",
      size ? `• ${t("common.size")}: ${size}` : "",
      `• ${t("dm.price")}: ${price(product.price)}`,
      ``,
      `${t("dm.link")}: ${site.url}/product/${product.slug}`,
    ].filter(Boolean);
    return parts.join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, color, size, t]);

  const requiresSize = !!product.sizes?.length;

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Info */}
        <div className="lg:py-2">
          <p className="text-xs uppercase tracking-[0.16em] text-stone">{product.brand}</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {product.name}
          </h1>

          {/* Rating — only shown once real reviews exist */}
          {typeof product.rating === "number" && (
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={product.rating} reviews={product.reviews} size="md" />
            </div>
          )}

          {/* Price */}
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-serif text-3xl text-ink">{price(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg text-taupe line-through">{price(product.compareAt)}</span>
            )}
            {off && (
              <span className="rounded-full bg-sale/10 px-2.5 py-1 text-xs font-semibold text-sale">
                Save {off}%
              </span>
            )}
          </div>

          {/* Low-stock note — only with a real stock count */}
          {typeof product.stock === "number" && product.stock <= 3 && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sale/10 px-3 py-1.5 text-sm font-medium text-sale">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sale opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sale" />
              </span>
              {t("pdp.onlyLeft", { n: product.stock! })}
            </p>
          )}

          {/* Above-the-fold reassurance */}
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-charcoal">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.75} /> {t("pdp.authentic")}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-gold" strokeWidth={1.75} /> {t("pdp.shippedCare")}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-gold" strokeWidth={1.75} /> {t("pdp.easyReturns")}
            </li>
          </ul>

          <p className="mt-6 leading-relaxed text-charcoal">{product.description}</p>

          {/* Colour */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-7">
              <p className="text-sm font-medium text-ink">
                {t("common.colour")}: <span className="text-stone">{color}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    className={`h-9 w-9 rounded-full border transition-all ${
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

          {/* Size */}
          {requiresSize && (
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink">
                  {t("common.size")}
                  {size ? <span className="text-stone">: {size}</span> : ""}
                </p>
                <Link href="/faq#sizing" className="text-xs text-stone underline underline-offset-2">
                  {t("common.sizeGuide")}
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes!.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    aria-pressed={size === s}
                    className={`min-h-[44px] min-w-[44px] rounded-md border px-3 text-sm transition-colors ${
                      size === s
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/20 text-charcoal hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p role="alert" className="mt-2 text-sm text-sale">
                  {t("pdp.sizeError")}
                </p>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <InstagramOrderButton message={message} className="btn-instagram w-full">
              {t("cta.orderInstagram")} · {price(product.price)}
            </InstagramOrderButton>
            <button
              type="button"
              onClick={() => toggle(product.slug)}
              className={`btn-outline w-full ${wished ? "border-sale text-sale hover:bg-sale" : ""}`}
            >
              <Heart className={`h-[18px] w-[18px] ${wished ? "fill-current" : ""}`} />
              {wished ? t("cta.savedWishlist") : t("cta.saveWishlist")}
            </button>
          </div>

          {/* Reassurance */}
          <ul className="mt-7 space-y-2.5 text-sm text-charcoal">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              {t("pdp.reassure.authentic")}
            </li>
            <li className="flex items-center gap-2.5">
              <Truck className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              {t("pdp.reassure.shipping")}
            </li>
            <li className="flex items-center gap-2.5">
              <RotateCcw className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              {t("pdp.reassure.returns")}
            </li>
          </ul>

          {/* Details accordion */}
          <div className="mt-9">
            <Accordion
              items={[
                {
                  title: t("pdp.acc.materials"),
                  content: (
                    <div className="space-y-3">
                      <p>{product.materials}</p>
                      <ul className="space-y-1.5">
                        {product.details.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                },
                {
                  title: t("pdp.acc.shipping"),
                  content: (
                    <div className="space-y-2">
                      <p>
                        {t("pdp.shipBody1", {
                          domestic: site.shipping.domestic,
                          region: site.shipping.region,
                        })}
                      </p>
                      <p>{t("pdp.shipBody2")}</p>
                    </div>
                  ),
                },
                {
                  title: t("pdp.acc.returns"),
                  content: (
                    <p>
                      {t("pdp.returnsBody")}{" "}
                      <Link href="/policies/returns" className="underline underline-offset-2">
                        {t("pdp.returnsLink")}
                      </Link>
                      .
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Sticky mobile buy bar (page-specific; global bar is hidden here) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 backdrop-blur-md lg:hidden">
        <div className="container-luxe flex items-center gap-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
          <div className="shrink-0">
            <p className="font-serif text-xl leading-none text-ink">{price(product.price)}</p>
            {product.compareAt && (
              <p className="text-xs text-taupe line-through">{price(product.compareAt)}</p>
            )}
          </div>
          <InstagramOrderButton message={message} className="btn-instagram flex-1">
            {t("cta.orderInstagram")}
          </InstagramOrderButton>
        </div>
      </div>
    </>
  );
}
