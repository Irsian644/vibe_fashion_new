"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "@/lib/products";
import { EASE_LUXE } from "@/lib/motion";
import { useT } from "@/lib/i18n/LocaleProvider";
import { CATEGORY_KEYS } from "@/lib/i18n/nav";

const BRANDS = ["Zara", "Guess", "Michael Kors", "Puma"];

// Editorial promo shown inside the panel.
const PROMO = {
  href: "/shop?category=jackets",
  img: "/products/jacket-aviator-2.jpeg",
  eyebrow: "The Winter Edit",
  title: "Shearling & statement outerwear",
};

/**
 * Desktop mega-menu. "Shop" opens a panel with category + brand columns and an
 * editorial promo. Hover-intent on desktop; fully keyboard-accessible. The rest
 * of the top-level links render inline alongside it.
 */
export function MegaMenu() {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <ul
      className="hidden items-center gap-7 lg:flex"
      onMouseLeave={() => setOpen(false)}
    >
      {/* Shop — opens the mega panel */}
      <li
        className="relative"
        onMouseEnter={() => setOpen(true)}
      >
        <Link
          href="/shop"
          className="link-underline text-[12px] font-medium uppercase tracking-[0.14em] text-charcoal hover:text-ink"
          onFocus={() => setOpen(true)}
          aria-expanded={open}
        >
          {t("nav.shop")}
        </Link>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: EASE_LUXE }}
              className="fixed inset-x-0 top-[calc(var(--header-h)+40px)] z-40"
            >
              <div className="container-luxe">
                <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-8 rounded-2xl border border-ink/10 bg-cream p-8 shadow-lift">
                  {/* Categories */}
                  <div>
                    <p className="eyebrow mb-4">{t("nav.categories")}</p>
                    <ul className="space-y-2.5">
                      {CATEGORIES.map((c) => (
                        <li key={c.key}>
                          <Link
                            href={`/shop?category=${c.key}`}
                            className="group flex items-baseline justify-between"
                          >
                            <span className="font-serif text-xl text-ink transition-colors group-hover:text-gold-deep">
                              {t(CATEGORY_KEYS[c.key].label)}
                            </span>
                            {CATEGORY_KEYS[c.key].blurb && (
                              <span className="text-xs text-stone">
                                {t(CATEGORY_KEYS[c.key].blurb!)}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                      <li className="pt-1">
                        <Link
                          href="/shop"
                          className="text-sm font-medium text-gold-deep underline-offset-4 hover:underline"
                        >
                          {t("nav.viewEverything")}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Brands */}
                  <div>
                    <p className="eyebrow mb-4">{t("nav.shopByBrand")}</p>
                    <ul className="space-y-2.5">
                      {BRANDS.map((b) => (
                        <li key={b}>
                          <Link
                            href={`/shop?brand=${encodeURIComponent(b)}`}
                            className="text-base text-charcoal transition-colors hover:text-ink"
                          >
                            {b}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-xs leading-relaxed text-stone">{t("nav.brandNote")}</p>
                  </div>

                  {/* Editorial promo */}
                  <Link
                    href={PROMO.href}
                    className="group relative overflow-hidden rounded-xl bg-sand"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={PROMO.img}
                        alt={PROMO.title}
                        fill
                        sizes="360px"
                        className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] uppercase tracking-luxe text-cream/80">
                        {PROMO.eyebrow}
                      </p>
                      <p className="mt-1 font-serif text-xl text-cream">{PROMO.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </li>

      {/* Direct category links */}
      {CATEGORIES.slice(0, 3).map((c) => (
        <li key={c.key}>
          <Link
            href={`/shop?category=${c.key}`}
            className="link-underline text-[12px] font-medium uppercase tracking-[0.14em] text-charcoal hover:text-ink"
          >
            {t(CATEGORY_KEYS[c.key].label)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
