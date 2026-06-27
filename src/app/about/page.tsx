import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, Truck } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Vibe Fashion brings affordable luxury to women across Kosovo and the region — authentic and designer-inspired bags, dresses and jackets, hand-picked in Prishtinë.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Authenticity first", desc: "Every branded piece is verified in person. No fakes, ever." },
  { icon: Sparkles, title: "Curated, not cluttered", desc: "We hand-pick a tight edit so every piece earns its place." },
  { icon: Heart, title: "Personal service", desc: "Real styling advice in your DMs — like shopping with a friend." },
  { icon: Truck, title: "Fast & fair", desc: "Quick regional shipping and honest, friendly prices." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/products/lifestyle-1.jpeg"
            alt="Vibe Fashion"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/55" />
        </div>
        <div className="container-luxe py-20 text-cream">
          <Reveal>
            <p className="eyebrow text-cream/80">Our story</p>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight text-balance sm:text-7xl">
              Designer dreams, real-life prices.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="container-luxe py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Where it began</p>
            <div className="space-y-5 text-lg leading-relaxed text-charcoal">
              <p>
                {site.name} started the way many good things do — in a DM. Friends kept asking where
                we found our bags, so we started sharing the pieces we loved on Instagram as{" "}
                <strong>@{site.instagram.handle}</strong>.
              </p>
              <p>
                Today we hand-pick a small, considered edit of authentic and designer-inspired
                fashion — the Zara saddle bag you&apos;ve been eyeing, the Michael Kors crossbody
                that lasts for years, the shearling jacket that finishes every outfit — all at
                prices that feel kind.
              </p>
              <p>
                We&apos;re based in {site.location}, and we treat every order like we&apos;re styling
                a friend: honest advice, careful packaging, and a piece you&apos;ll actually reach
                for.
              </p>
            </div>
            <Link href="/shop" className="btn-primary mt-8">
              Shop the edit
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
              <Image
                src="/products/bag-mk-vanilla-2.jpeg"
                alt="A hand-picked Michael Kors bag from the Vibe Fashion edit"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand/60 py-20">
        <div className="container-luxe">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow mb-2">What we stand for</p>
            <h2 className="h-display text-4xl text-ink sm:text-5xl">The Vibe promise</h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Reveal key={v.title}>
                <v.icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-2xl text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
