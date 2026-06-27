"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";

/** Honour the user's reduced-motion preference (SSR-safe). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------------------------------------------ *
 * useMagnetic — element translates toward the cursor while it is near,
 * then springs home on leave. The spring is what stops it feeling
 * jittery: raw pointer deltas are noisy, the spring smooths them.
 * ------------------------------------------------------------------ */

const MAGNETIC_SPRING: SpringOptions = { stiffness: 170, damping: 15, mass: 0.6 };

export function useMagnetic<T extends HTMLElement>(
  /** How far the element is allowed to drift toward the cursor (px). */
  strength = 14,
  /** Activation padding around the element's box (px). */
  radius = 28,
): {
  ref: RefObject<T>;
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const ref = useRef<T>(null);
  const x = useSpring(useMotionValue(0), MAGNETIC_SPRING);
  const y = useSpring(useMotionValue(0), MAGNETIC_SPRING);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Inside the box-plus-radius zone? Pull toward cursor, scaled by proximity.
        const within =
          Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;

        if (within) {
          x.set((dx / (r.width / 2 + radius)) * strength);
          y.set((dy / (r.height / 2 + radius)) * strength);
        } else {
          x.set(0);
          y.set(0);
        }
      });
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, radius, x, y]);

  return { ref, x, y };
}

/* ------------------------------------------------------------------ *
 * useTilt — 3D rotation + a glare position that follow the cursor over
 * the element. Returns springy rotateX/rotateY plus normalised glare
 * coordinates (0–100%) for a radial-gradient highlight.
 * ------------------------------------------------------------------ */

const TILT_SPRING: SpringOptions = { stiffness: 150, damping: 18, mass: 0.5 };

export function useTilt<T extends HTMLElement>(max = 8): {
  ref: RefObject<T>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  glareX: MotionValue<string>;
  glareY: MotionValue<string>;
  glareOpacity: MotionValue<number>;
  onPointerMove: (e: React.PointerEvent<T>) => void;
  onPointerLeave: () => void;
} {
  const ref = useRef<T>(null);

  // px = pointer position normalised to -0.5..0.5 across the element.
  const px = useSpring(useMotionValue(0), TILT_SPRING);
  const py = useSpring(useMotionValue(0), TILT_SPRING);
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  const rotateY = useTransform(px, (v) => v * max);
  const rotateX = useTransform(py, (v) => -v * max);
  const glareX = useTransform(px, (v) => `${50 + v * 100}%`);
  const glareY = useTransform(py, (v) => `${50 + v * 100}%`);

  const onPointerMove = (e: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    glareOpacity.set(1);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
    glareOpacity.set(0);
  };

  return { ref, rotateX, rotateY, glareX, glareY, glareOpacity, onPointerMove, onPointerLeave };
}

/* ------------------------------------------------------------------ *
 * burstParticles — fires a short-lived ring of gold dots from a screen
 * point. Pure DOM + WAAPI (no canvas, no deps), auto-cleans, and is a
 * no-op under reduced-motion. Used by the wishlist heart.
 * ------------------------------------------------------------------ */

export function burstParticles(originX: number, originY: number, count = 12): void {
  if (typeof document === "undefined" || prefersReducedMotion()) return;

  const layer = document.createElement("div");
  layer.style.cssText =
    "position:fixed;left:0;top:0;width:0;height:0;pointer-events:none;z-index:90;";
  document.body.appendChild(layer);

  const GOLDS = ["#B6924D", "#C7A867", "#E4CE94", "#8C6E37"];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    const size = 4 + Math.random() * 4;
    dot.style.cssText = `position:absolute;left:${originX}px;top:${originY}px;width:${size}px;height:${size}px;border-radius:9999px;background:${GOLDS[i % GOLDS.length]};will-change:transform,opacity;`;
    layer.appendChild(dot);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const distance = 26 + Math.random() * 34;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 10; // slight upward bias (gravity feel)

    dot.animate(
      [
        { transform: "translate(-50%, -50%) scale(0.4)", opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`, opacity: 1, offset: 0.7 },
        { transform: `translate(calc(-50% + ${tx * 1.15}px), calc(-50% + ${ty * 1.15 + 14}px)) scale(0.2)`, opacity: 0 },
      ],
      { duration: 620 + Math.random() * 180, easing: "cubic-bezier(0.22,1,0.36,1)" },
    );
  }

  setTimeout(() => layer.remove(), 900);
}
