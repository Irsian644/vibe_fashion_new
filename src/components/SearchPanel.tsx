"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/lib/products";
import { price } from "@/lib/format";

const SUGGESTIONS = ["Bags", "Michael Kors", "Zara", "Dresses", "Jackets", "Beige"];

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      // focus shortly after mount so the animation doesn't fight the keyboard
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 top-0 z-[90] bg-cream shadow-lift"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Search"
          >
            <div className="container-luxe py-5">
              <div className="flex items-center gap-3 border-b border-ink/20 pb-3">
                <Search className="h-5 w-5 text-stone" />
                <input
                  ref={inputRef}
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search bags, dresses, brands…"
                  className="h-10 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-taupe"
                  aria-label="Search products"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-sand"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!q && (
                <div className="mt-5">
                  <p className="eyebrow mb-3">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQ(s)}
                        className="rounded-full border border-ink/15 px-4 py-2 text-sm text-charcoal hover:border-ink hover:bg-ink hover:text-cream"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="py-8 text-center text-stone">
                      No matches for “{q}”. Try “bags” or “Zara”.
                    </p>
                  ) : (
                    <ul className="divide-y divide-ink/5">
                      {results.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-4 py-3 hover:opacity-80"
                          >
                            <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded bg-sand">
                              <Image
                                src={p.images[0]}
                                alt={p.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-serif text-lg leading-tight">{p.name}</p>
                              <p className="text-xs uppercase tracking-wide text-stone">
                                {p.brand}
                              </p>
                            </div>
                            <span className="font-medium">{price(p.price)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
