"use client";

import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { CATEGORIES } from "@/lib/products";
import { NewsletterInline } from "./NewsletterInline";
import { useT } from "@/lib/i18n/LocaleProvider";
import { CATEGORY_KEYS } from "@/lib/i18n/nav";

export function Footer() {
  const t = useT();
  return (
    <footer className="mt-24 border-t border-ink/10 bg-sand/60">
      <div className="container-luxe py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <p className="font-serif text-3xl font-semibold tracking-[0.02em] text-ink">
              VIBE<span className="text-gold">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
              {t("footer.tagline")} {t("hero.sub")}
            </p>
            <div className="mt-6">
              <NewsletterInline />
            </div>
          </div>

          {/* Shop */}
          <nav aria-label={t("footer.shop")}>
            <p className="eyebrow mb-4">{t("footer.shop")}</p>
            <ul className="space-y-2.5 text-sm text-charcoal">
              <li>
                <Link href="/shop" className="link-underline">
                  {t("shop.title")}
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <Link href={`/shop?category=${c.key}`} className="link-underline">
                    {t(CATEGORY_KEYS[c.key].label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help */}
          <nav aria-label={t("footer.help")}>
            <p className="eyebrow mb-4">{t("footer.help")}</p>
            <ul className="space-y-2.5 text-sm text-charcoal">
              <li>
                <Link href="/faq" className="link-underline">
                  {t("nav.faq")}
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="link-underline">
                  {t("trust.shipping.title")}
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="link-underline">
                  {t("pdp.acc.returns")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-underline">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="link-underline">
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="eyebrow mb-4">{t("cta.followUs")}</p>
            <ul className="space-y-3 text-sm text-charcoal">
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 link-underline"
                >
                  <Instagram className="h-4 w-4" /> @{site.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 link-underline"
                >
                  <Mail className="h-4 w-4" /> {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-stone">
                <MapPin className="h-4 w-4" /> {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-7 text-xs text-stone sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {t("footer.rights")}
          </p>
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
