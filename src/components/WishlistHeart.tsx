"use client";

import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistProvider";
import { burstParticles } from "@/lib/interactions";
import { flyToWishlist } from "./wishlist-fly";

/**
 * Wishlist toggle with a tactile "save" moment:
 *  - scale bounce 0.8 → 1.2 → 1 (spring, only when adding)
 *  - gold particle burst from the heart centre
 *  - a clone of the product image flies to the navbar heart
 */
export function WishlistHeart({
  slug,
  image,
  className = "absolute right-2.5 top-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/85 text-ink backdrop-blur",
}: {
  slug: string;
  image?: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const wished = has(slug);
  const controls = useAnimationControls();
  const ref = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    const willAdd = !wished;
    toggle(slug);

    if (willAdd && ref.current) {
      const r = ref.current.getBoundingClientRect();
      burstParticles(r.left + r.width / 2, r.top + r.height / 2, 12);
      controls.start({
        scale: [0.8, 1.2, 1],
        transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }, // overshoot back-out
      });
      if (image) flyToWishlist(image, r);
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      animate={controls}
      onClick={onClick}
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wished}
      className={`${className} transition-colors hover:bg-cream active:scale-95`}
    >
      <Heart className={`h-[18px] w-[18px] ${wished ? "fill-sale text-sale" : ""}`} />
    </motion.button>
  );
}
