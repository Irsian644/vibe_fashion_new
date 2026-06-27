"use client";

import { prefersReducedMotion } from "@/lib/interactions";

/**
 * Decoupled "fly to the navbar heart" animation.
 *
 * Any component can call flyToWishlist(image, originRect). The navbar heart
 * registers a target getter; we clone the product image and animate it from
 * the origin to the heart with WAAPI — shrinking, curving and fading, then
 * landing with a tiny pop on the heart. No React state in the hot path.
 */

type RectGetter = () => DOMRect | null;
let getTargetRect: RectGetter | null = null;
let onLand: (() => void) | null = null;

export function registerWishlistTarget(getter: RectGetter, landed: () => void) {
  getTargetRect = getter;
  onLand = landed;
  return () => {
    if (getTargetRect === getter) getTargetRect = null;
    if (onLand === landed) onLand = null;
  };
}

export function flyToWishlist(image: string, origin: DOMRect) {
  if (typeof document === "undefined" || prefersReducedMotion()) {
    onLand?.();
    return;
  }
  const target = getTargetRect?.();
  if (!target) {
    onLand?.();
    return;
  }

  const size = 64;
  const clone = document.createElement("div");
  clone.style.cssText = [
    "position:fixed",
    `left:${origin.left + origin.width / 2 - size / 2}px`,
    `top:${origin.top + origin.height / 2 - size / 2}px`,
    `width:${size}px`,
    `height:${size}px`,
    "border-radius:12px",
    "overflow:hidden",
    "z-index:80",
    "pointer-events:none",
    "box-shadow:0 12px 40px rgba(22,19,15,0.28)",
    `background-image:url(${image})`,
    "background-size:cover",
    "background-position:center",
    "will-change:transform,opacity",
  ].join(";");
  document.body.appendChild(clone);

  const dx = target.left + target.width / 2 - (origin.left + origin.width / 2);
  const dy = target.top + target.height / 2 - (origin.top + origin.height / 2);

  const anim = clone.animate(
    [
      { transform: "translate(0,0) scale(1)", opacity: 1, offset: 0 },
      // arc up first for a "thrown" feel
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 40}px) scale(0.6)`, opacity: 0.9, offset: 0.6 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.15)`, opacity: 0.2, offset: 1 },
    ],
    { duration: 700, easing: "cubic-bezier(0.5, 0, 0.2, 1)", fill: "forwards" },
  );

  anim.onfinish = () => {
    clone.remove();
    onLand?.();
  };
}
