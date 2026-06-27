"use client";

import { useT } from "@/lib/i18n/LocaleProvider";

/**
 * Editorial running strip — pure-CSS marquee (no JS).
 * Two identical halves translate -50% for a seamless, jump-free loop.
 * Pauses on hover, respects reduced-motion, and fades at both edges.
 */
export function Marquee() {
  const t = useT();
  const WORDS = t("marquee.items").split("|");

  const Row = () => (
    <ul className="flex shrink-0 items-center gap-10 px-5" aria-hidden="true">
      {WORDS.map((w, i) => (
        <li key={i} className="flex items-center gap-10">
          <span className="font-serif text-lg italic text-cream/90 sm:text-xl">{w}</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className="group overflow-hidden border-y border-cream/10 bg-ink py-4"
      aria-label="Highlights"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee will-change-transform [animation-play-state:running] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row />
      </div>
    </section>
  );
}
