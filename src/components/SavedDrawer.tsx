"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, Instagram, Trash2, Check } from "lucide-react";
import { products as ALL_PRODUCTS, type Product } from "@/lib/products";
import { price } from "@/lib/format";
import { site } from "@/lib/site";
import { EASE_LUXE } from "@/lib/motion";
import { useWishlist } from "./WishlistProvider";
import { useT } from "@/lib/i18n/LocaleProvider";

/* ----------------------------- open/close context ----------------------------- */

type DrawerCtx = { open: boolean; openDrawer: () => void; closeDrawer: () => void };
const Ctx = createContext<DrawerCtx | null>(null);
export function useSavedDrawer() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSavedDrawer must be used within SavedDrawerProvider");
  return c;
}

export function SavedDrawerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openDrawer, closeDrawer }), [open, openDrawer, closeDrawer]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <SavedDrawer />
    </Ctx.Provider>
  );
}

/* --------------------------------- the drawer --------------------------------- */

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 + i * 0.05, duration: 0.45, ease: EASE_LUXE },
  }),
};

function buildOrderMessage(items: Product[]): string {
  const lines = [
    `Hi ${site.name}! 👋 I'd love to order these saved pieces:`,
    "",
    ...items.map((p) => `• ${p.name} (${p.brand}) — ${price(p.price)}`),
    "",
    `Total: ${price(items.reduce((s, p) => s + p.price, 0))}`,
  ];
  return lines.join("\n");
}

function SavedDrawer() {
  const t = useT();
  const { open, closeDrawer } = useSavedDrawer();
  const { wishlist, toggle } = useWishlist();
  const [copied, setCopied] = useState(false);

  const items = useMemo(
    () => wishlist.map((slug) => ALL_PRODUCTS.find((p) => p.slug === slug)).filter((p): p is Product => Boolean(p)),
    [wishlist],
  );
  const total = items.reduce((s, p) => s + p.price, 0);

  // Lock body scroll + close on Escape
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeDrawer]);

  // Instagram has no prefilled-DM deep link → copy the order, then open the profile.
  const checkout = async () => {
    try {
      await navigator.clipboard.writeText(buildOrderMessage(items));
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard may be blocked; still open IG */
    }
    window.open(site.instagram.url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[90] flex w-[92%] max-w-md flex-col bg-cream shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
            role="dialog"
            aria-label={t("nav.saved")}
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-sale" />
                <span className="font-serif text-xl font-semibold">
                  {t("drawer.saved")}
                  {items.length ? ` · ${items.length}` : ""}
                </span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-sand"
                aria-label={t("nav.closeMenu")}
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <Heart className="h-10 w-10 text-taupe" strokeWidth={1.25} />
                <p className="mt-4 font-serif text-2xl text-ink">{t("drawer.empty.title")}</p>
                <p className="mt-2 text-sm text-stone">{t("drawer.empty.body")}</p>
                <Link href="/shop" onClick={closeDrawer} className="btn-outline mt-6">
                  {t("drawer.empty.cta")}
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                  {items.map((p, i) => (
                    <motion.li
                      key={p.slug}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      className="flex items-center gap-3 rounded-lg bg-sand/60 p-2.5"
                    >
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={closeDrawer}
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-sand"
                      >
                        <Image src={p.images[0]} alt="" fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-stone">
                          {p.brand}
                        </p>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={closeDrawer}
                          className="block truncate font-serif text-lg leading-tight text-ink"
                        >
                          {p.name}
                        </Link>
                        <p className="mt-1 font-medium tabular-nums text-ink">{price(p.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle(p.slug)}
                        aria-label={`Remove ${p.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-stone hover:bg-cream hover:text-sale"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <footer className="border-t border-ink/10 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-sm uppercase tracking-[0.12em] text-stone">
                      {t("drawer.total")}
                    </span>
                    <span className="font-serif text-2xl text-ink tabular-nums">{price(total)}</span>
                  </div>
                  <button type="button" onClick={checkout} className="btn-gold w-full">
                    {copied ? (
                      <>
                        <Check className="h-[18px] w-[18px]" /> {t("drawer.copied")}
                      </>
                    ) : (
                      <>
                        <Instagram className="h-[18px] w-[18px] [@media(prefers-reduced-motion:no-preference)]:transition-transform" />
                        {t("drawer.checkout")}
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center text-xs text-stone">
                    {t("drawer.note", { handle: site.instagram.handle })}
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
