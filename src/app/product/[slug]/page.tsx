import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProduct, getRelated, products } from "@/lib/products";
import { price } from "@/lib/format";
import { site } from "@/lib/site";
import { ProductDetail } from "@/components/ProductDetail";
// import { Reviews } from "@/components/Reviews"; // re-enable once real reviews exist
import { ProductGrid } from "@/components/ProductGrid";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { ProductSchema, BreadcrumbSchema } from "@/components/Schema";
import { getT } from "@/lib/i18n/server";
import { CATEGORY_KEYS } from "@/lib/i18n/nav";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };

  const title = `${product.name} — ${product.brand}`;
  const description = `${product.description.slice(0, 150)}… Now ${price(product.price)}. Order via Instagram from ${site.name}, ${site.location}.`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: product.images[0], width: 1200, height: 1600, alt: product.name }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelated(product, 4);
  const t = getT();
  const catKey = CATEGORY_KEYS[product.category]?.label;

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
          { name: product.name, url: `/product/${product.slug}` },
        ]}
      />

      <div className="container-luxe pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-1.5 text-xs text-stone">
          <Link href="/" className="hover:text-ink">
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
            {catKey ? t(catKey) : product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate text-charcoal">{product.name}</span>
        </nav>

        <ProductDetail product={product} />

        {/* Reviews hidden until real customer reviews exist:
            <div className="mt-16"><Reviews product={product} /></div> */}
      </div>

      {/* Related */}
      <section aria-label={t("pdp.related")} className="container-luxe py-16">
        <h2 className="h-display mb-8 text-3xl text-ink sm:text-4xl">{t("pdp.related")}</h2>
        <ProductGrid products={related} />
      </section>

      <RecentlyViewed excludeSlug={product.slug} />
    </>
  );
}
