"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "./Reveal";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { MessageKey } from "@/lib/i18n/messages";

const cards: {
  key: string;
  label: MessageKey;
  blurb: MessageKey;
  img: string;
  span: string;
  h: string;
}[] = [
  {
    key: "bags",
    label: "cat.bags",
    blurb: "cat.bags.blurb",
    img: "/products/bag-mk-vanilla-1.jpeg",
    span: "lg:col-span-2 lg:row-span-2",
    h: "h-[420px] lg:h-full",
  },
  {
    key: "jackets",
    label: "cat.jackets",
    blurb: "cat.jackets.blurb",
    img: "/products/jacket-aviator-2.jpeg",
    span: "",
    h: "h-[260px]",
  },
  {
    key: "dresses",
    label: "cat.dresses",
    blurb: "cat.dresses.blurb",
    img: "/products/dress-lace-cream-1.jpeg",
    span: "",
    h: "h-[260px]",
  },
];

export function CategoryGrid() {
  const t = useT();
  return (
    <section aria-label="Shop by category" className="container-luxe py-20">
      <RevealGroup className="grid auto-rows-min gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {cards.map((c) => (
          <RevealItem key={c.key} className={c.span}>
            <Link
              href={`/shop?category=${c.key}`}
              className={`group relative block w-full overflow-hidden rounded-lg bg-sand ${c.h}`}
            >
              <Image
                src={c.img}
                alt={c.label}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-[transform,filter] duration-700 ease-luxe will-change-transform group-hover:scale-[1.03] group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <h3 className="font-serif text-3xl text-cream sm:text-4xl">{t(c.label)}</h3>
                  <p className="mt-1 text-sm text-cream/80">{t(c.blurb)}</p>
                </div>
                {/* Arrow pill: expands (w), slides toward label, and the icon
                    rotates -45° → 0 for a crisp "open" gesture. */}
                <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cream/90 text-ink shadow-soft transition-[width,transform] duration-500 ease-luxe group-hover:w-14 group-hover:-translate-x-0.5">
                  <ArrowRight className="h-5 w-5 -rotate-45 transition-transform duration-500 ease-luxe group-hover:translate-x-0.5 group-hover:rotate-0" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
