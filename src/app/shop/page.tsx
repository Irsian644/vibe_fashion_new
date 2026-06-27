import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { products, CATEGORIES, type Category } from "@/lib/products";
import { ShopClient } from "@/components/ShopClient";
import { BreadcrumbSchema } from "@/components/Schema";
import { getT } from "@/lib/i18n/server";
import { CATEGORY_KEYS } from "@/lib/i18n/nav";

export const metadata: Metadata = {
  title: "Shop All — Bags, Dresses & Jackets",
  description:
    "Shop the full Vibe Fashion collection: designer-inspired & authentic bags, dresses and jackets. Filter by category, brand and price, order via Instagram, shipped across Kosovo & the region.",
  alternates: { canonical: "/shop" },
};

const VALID = new Set<string>(CATEGORIES.map((c) => c.key));

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const raw = searchParams.category;
  const activeCategory = (raw && VALID.has(raw) ? raw : "all") as Category | "all";
  const heading = CATEGORIES.find((c) => c.key === activeCategory);
  const t = getT();
  const headingLabel = heading ? t(CATEGORY_KEYS[heading.key].label) : t("shop.title");
  const headingBlurb =
    heading && CATEGORY_KEYS[heading.key].blurb
      ? t(CATEGORY_KEYS[heading.key].blurb!)
      : t("shop.intro");

  return (
    <div className="container-luxe pt-12">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
        ]}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-stone">
        <Link href="/" className="hover:text-ink">
          {t("nav.home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {heading ? (
          <>
            <Link href="/shop" className="hover:text-ink">
              {t("nav.shop")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-charcoal">{headingLabel}</span>
          </>
        ) : (
          <span className="text-charcoal">{t("nav.shop")}</span>
        )}
      </nav>

      <header className="mb-8 max-w-2xl">
        <p className="eyebrow mb-2">{heading ? headingBlurb : t("shop.intro")}</p>
        <h1 className="h-display text-5xl text-ink sm:text-6xl">{headingLabel}</h1>
        <p className="mt-4 leading-relaxed text-stone">{t("shop.intro")}</p>
      </header>

      <Suspense fallback={null}>
        <ShopClient products={products} />
      </Suspense>
    </div>
  );
}
