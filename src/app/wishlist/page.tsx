"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/lib/products";
import { useWishlist } from "@/components/WishlistProvider";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, ready } = useWishlist();
  const items = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="container-luxe py-16">
      <header className="mb-10">
        <p className="eyebrow mb-2">Your saved pieces</p>
        <h1 className="h-display text-5xl text-ink sm:text-6xl">Wishlist</h1>
      </header>

      {!ready ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[3/4] rounded-md" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sand">
            <Heart className="h-7 w-7 text-taupe" />
          </span>
          <p className="mt-6 font-serif text-3xl text-ink">Nothing saved yet</p>
          <p className="mt-2 max-w-sm text-stone">
            Tap the heart on any piece to save it here for later.
          </p>
          <Link href="/shop" className="btn-primary mt-7">
            Start browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
