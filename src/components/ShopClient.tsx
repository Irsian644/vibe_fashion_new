"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { type Category, type Product, CATEGORIES, discountPct } from "@/lib/products";
import { ProductGrid } from "./ProductGrid";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { MessageKey } from "@/lib/i18n/messages";
import { CATEGORY_KEYS } from "@/lib/i18n/nav";

type SortKey = "featured" | "price-asc" | "price-desc" | "discount";

const SORTS: { key: SortKey; label: MessageKey }[] = [
  { key: "featured", label: "shop.sort.featured" },
  { key: "price-asc", label: "shop.sort.priceAsc" },
  { key: "price-desc", label: "shop.sort.priceDesc" },
  { key: "discount", label: "shop.sort.discount" },
];

const PRICE_BANDS: { key: string; label: MessageKey; min: number; max: number }[] = [
  { key: "under-30", label: "shop.priceUnder", min: 0, max: 29.99 },
  { key: "30-50", label: "shop.price3050", min: 30, max: 50 },
  { key: "50-70", label: "shop.price5070", min: 50, max: 70 },
  { key: "70-plus", label: "shop.price70", min: 70, max: Infinity },
];

const VALID = new Set<string>(CATEGORIES.map((c) => c.key));

export function ShopClient({ products }: { products: Product[] }) {
  const t = useT();
  const FILTERS: { key: Category | "all"; label: string }[] = [
    { key: "all", label: t("shop.all") },
    ...CATEGORIES.map((c) => ({ key: c.key, label: t(CATEGORY_KEYS[c.key].label) })),
  ];
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<SortKey>("featured");
  // Brand can be deep-linked from the mega-menu (?brand=Guess); seed state from it.
  const [brand, setBrand] = useState<string | null>(() => searchParams.get("brand"));
  const [band, setBand] = useState<string | null>(null);

  // Category is derived from the URL on every render, so it stays in sync with
  // soft navigations (navbar / footer / home grid links) as well as the chips below.
  const raw = searchParams.get("category");
  const category: Category | "all" = raw && VALID.has(raw) ? (raw as Category) : "all";

  // Keep the brand filter in sync when ?brand= changes via a soft navigation
  // (e.g. clicking a mega-menu brand link while already on /shop).
  const urlBrand = searchParams.get("brand");
  const lastUrlBrand = useRef(urlBrand);
  useEffect(() => {
    if (urlBrand !== lastUrlBrand.current) {
      lastUrlBrand.current = urlBrand;
      setBrand(urlBrand);
    }
  }, [urlBrand]);

  // Brands present in the catalog, in catalog order (deduped).
  const brands = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const p of products) {
      if (!seen.has(p.brand)) {
        seen.add(p.brand);
        list.push(p.brand);
      }
    }
    return list;
  }, [products]);

  const filtered = useMemo(() => {
    let list = category === "all" ? products : products.filter((p) => p.category === category);
    if (brand) list = list.filter((p) => p.brand === brand);
    if (band) {
      const b = PRICE_BANDS.find((x) => x.key === band);
      if (b) list = list.filter((p) => p.price >= b.min && p.price <= b.max);
    }
    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list.sort((a, b) => (discountPct(b) ?? 0) - (discountPct(a) ?? 0));
        break;
      default:
        list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
    return list;
  }, [products, category, brand, band, sort]);

  const selectCategory = (key: Category | "all") => {
    const url = key === "all" ? "/shop" : `/shop?category=${key}`;
    router.replace(url, { scroll: false });
  };

  const hasRefinements = brand !== null || band !== null;
  const clearRefinements = () => {
    setBrand(null);
    setBand(null);
  };

  // Remount key: any change to the result set replays the entrance animation.
  const gridKey = `${category}-${brand ?? ""}-${band ?? ""}`;

  return (
    <>
      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-5 mb-6 border-y border-ink/10 bg-cream/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="no-scrollbar -mx-1 flex flex-1 gap-2 overflow-x-auto px-1">
            {FILTERS.map((f) => {
              const active = f.key === category;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => selectCategory(f.key)}
                  aria-pressed={active}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-ink text-cream"
                      : "border border-ink/15 text-charcoal hover:border-ink"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="shrink-0">
            <label htmlFor="sort" className="sr-only">
              {t("shop.sort")}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 cursor-pointer rounded-full border border-ink/15 bg-white px-4 text-sm text-charcoal outline-none focus:border-gold"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {t(s.label)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Refinements: brand + price */}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/5 pt-3">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-stone">
            <SlidersHorizontal className="h-3.5 w-3.5" /> {t("shop.brand")}
          </div>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {brands.map((b) => {
              const active = brand === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBrand(active ? null : b)}
                  aria-pressed={active}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors ${
                    active ? "bg-gold text-ink" : "border border-ink/15 text-charcoal hover:border-ink"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>

          <div className="ml-0 flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-stone sm:ml-2">
            {t("shop.price")}
          </div>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {PRICE_BANDS.map((b) => {
              const active = band === b.key;
              return (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setBand(active ? null : b.key)}
                  aria-pressed={active}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors ${
                    active ? "bg-gold text-ink" : "border border-ink/15 text-charcoal hover:border-ink"
                  }`}
                >
                  {t(b.label)}
                </button>
              );
            })}
          </div>

          {hasRefinements && (
            <button
              type="button"
              onClick={clearRefinements}
              className="inline-flex items-center gap-1 text-xs text-sale hover:underline"
            >
              <X className="h-3.5 w-3.5" /> {t("shop.clear")}
            </button>
          )}
        </div>
      </div>

      <p className="mb-6 text-sm text-stone" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? t("shop.count.one") : t("shop.count.other")}
        {brand ? ` · ${brand}` : ""}
      </p>

      {filtered.length > 0 ? (
        <ProductGrid key={gridKey} products={filtered} priorityCount={4} trigger="mount" />
      ) : (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-ink">{t("shop.empty.title")}</p>
          <p className="mt-2 text-stone">{t("shop.empty.body")}</p>
          {hasRefinements && (
            <button type="button" onClick={clearRefinements} className="btn-outline mt-6">
              {t("shop.clear")}
            </button>
          )}
        </div>
      )}
    </>
  );
}
