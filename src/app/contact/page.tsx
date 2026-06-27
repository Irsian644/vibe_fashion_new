import type { Metadata } from "next";
import { Instagram, Mail, MapPin, Clock } from "lucide-react";
import { site, instagramDmLink } from "@/lib/site";
import { InstagramOrderButton } from "@/components/InstagramOrderButton";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vibe Fashion. Order or ask anything via Instagram DM — we reply fast. Based in Prishtinë, Kosovë.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-luxe py-16">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-2">We&apos;d love to hear from you</p>
        <h1 className="h-display text-5xl text-ink sm:text-6xl">Get in touch</h1>
        <p className="mt-4 leading-relaxed text-stone">
          The fastest way to order or ask about sizing, stock and shipping is an Instagram DM — we
          usually reply within a couple of hours.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Primary contact card */}
        <Reveal className="rounded-2xl bg-ink p-8 text-cream sm:p-10">
          <h2 className="font-serif text-3xl">Order on Instagram</h2>
          <p className="mt-3 text-cream/70">
            Tell us what you love and we&apos;ll confirm availability, total and delivery right away.
          </p>
          <div className="mt-7">
            <InstagramOrderButton
              message={`Hi ${site.name}! I have a question / I'd like to order.`}
              className="btn-instagram w-full sm:w-auto"
            >
              Message us on Instagram
            </InstagramOrderButton>
          </div>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-cream/80 hover:text-cream"
          >
            <Instagram className="h-5 w-5" /> DM @{site.instagram.handle}
          </a>
        </Reveal>

        {/* Details */}
        <Reveal delay={0.1} className="space-y-7">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <p className="font-medium text-ink">Where we are</p>
              <p className="text-stone">{site.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <p className="font-medium text-ink">Email</p>
              <a href={`mailto:${site.email}`} className="text-stone underline-offset-2 hover:underline">
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <p className="font-medium text-ink">Hours</p>
              <p className="text-stone">Mon–Sat · 09:00–21:00</p>
            </div>
          </div>

          <a
            href={instagramDmLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-ink/10 bg-white p-5 transition-shadow hover:shadow-soft"
          >
            <p className="text-sm text-stone">Prefer to chat now?</p>
            <p className="mt-1 font-serif text-2xl text-ink">Start an Instagram chat →</p>
          </a>
        </Reveal>
      </div>
    </div>
  );
}
