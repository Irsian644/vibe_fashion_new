import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { TrustBar } from "@/components/TrustBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductGrid } from "@/components/ProductGrid";
import { Lookbook } from "@/components/Lookbook";
import { InstagramFeed } from "@/components/InstagramFeed";
import { getFeatured } from "@/lib/products";
import { getT } from "@/lib/i18n/server";
// Re-enable once the client has real content:
//   import { DropBanner } from "@/components/DropBanner";   // needs a real sale + drop date
//   import { Testimonials } from "@/components/Testimonials"; // needs real customer quotes

export default function HomePage() {
  const featured = getFeatured(8);
  const t = getT();

  return (
    <>
      <Hero />
      <Marquee />
      <CategoryGrid />

      <section aria-label={t("home.newArrivals.title")} className="container-luxe">
        <SectionHeading
          eyebrow={t("home.newArrivals.eyebrow")}
          title={t("home.newArrivals.title")}
          link={{ href: "/shop", label: t("cta.viewAll") }}
        />
        <div className="mt-10">
          <ProductGrid products={featured} priorityCount={4} />
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="btn-outline">
            {t("home.newArrivals.viewAll")}
          </Link>
        </div>
      </section>

      <div className="mt-20">
        <Lookbook />
      </div>

      <TrustBar />

      {/* Hidden until real content exists:
          - <DropBanner /> needs a genuine sale + fixed drop date
          - <Testimonials /> needs real customer quotes */}

      <InstagramFeed />
    </>
  );
}
