"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

function useCountdown(targetMs: number) {
  const [left, setLeft] = useState(targetMs - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(targetMs - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  const clamp = Math.max(0, left);
  return {
    h: Math.floor(clamp / 3.6e6),
    m: Math.floor((clamp % 3.6e6) / 6e4),
    s: Math.floor((clamp % 6e4) / 1000),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[2.5rem] rounded-md bg-cream px-2 py-1.5 text-center font-serif text-2xl tabular-nums text-ink sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1.5 text-[10px] uppercase tracking-luxe text-cream/60">{label}</span>
    </div>
  );
}

export function DropBanner() {
  // 36h rolling countdown from first render (replace with a fixed drop date in production)
  const [target] = useState(() => Date.now() + 36 * 3.6e6);
  const { h, m, s } = useCountdown(target);

  return (
    <section className="container-luxe">
      <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-center text-cream sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
          aria-hidden="true"
        />
        <p className="eyebrow text-gold-soft">Limited drop · while stock lasts</p>
        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
          Up to 30% off this week&apos;s edit
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-cream/70">
          Many pieces are one-of-one. When they&apos;re gone, they&apos;re gone.
        </p>

        <div className="mt-8 flex items-start justify-center gap-3 sm:gap-4">
          <Unit value={h} label="Hours" />
          <span className="pt-1.5 font-serif text-2xl text-cream/40 sm:text-3xl">:</span>
          <Unit value={m} label="Min" />
          <span className="pt-1.5 font-serif text-2xl text-cream/40 sm:text-3xl">:</span>
          <Unit value={s} label="Sec" />
        </div>

        <Link href="/shop" className="btn-gold mt-9">
          Shop the drop
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
