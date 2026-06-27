"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { useT } from "@/lib/i18n/LocaleProvider";

// In production, replace with the Instagram Basic Display API / a feed widget.
// These are real catalog shots used as the placeholder grid.
const feed = [
  "/products/bag-mk-vanilla-1.jpeg",
  "/products/jacket-aviator-1.jpeg",
  "/products/bag-guess-flap-1.jpeg",
  "/products/dress-lace-cream-1.jpeg",
  "/products/bag-mk-crossbody-1.jpeg",
  "/products/shoes-puma-1.jpeg",
];

export function InstagramFeed() {
  const t = useT();
  return (
    <section aria-label="Instagram" className="container-luxe py-20">
      <Reveal className="mb-10 text-center">
        <p className="eyebrow mb-2">{t("ig.eyebrow")}</p>
        <h2 className="h-display text-4xl text-ink sm:text-5xl">@{site.instagram.handle}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone">{t("ig.body")}</p>
      </Reveal>

      <RevealGroup className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {feed.map((src, i) => (
          <RevealItem key={src}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-md bg-sand"
              aria-label={`View post ${i + 1} on Instagram`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                <Instagram className="h-7 w-7 text-cream" />
              </span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 text-center">
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
          <Instagram className="h-[18px] w-[18px]" />
          {t("cta.followUs")} @{site.instagram.handle}
        </a>
      </Reveal>
    </section>
  );
}
