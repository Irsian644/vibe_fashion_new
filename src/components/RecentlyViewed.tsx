"use client";

import { products } from "@/lib/products";
import { useWishlist } from "./WishlistProvider";
import { ProductCard } from "./ProductCard";

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const { recentlyViewed, ready } = useWishlist();
  if (!ready) return null;

  const items = recentlyViewed
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section aria-label="Recently viewed" className="container-luxe py-16">
      <h2 className="h-display mb-8 text-3xl text-ink sm:text-4xl">Recently viewed</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
