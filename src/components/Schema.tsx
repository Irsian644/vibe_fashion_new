import { site } from "@/lib/site";
import { type Product, discountPct } from "@/lib/products";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Store",
        name: site.name,
        description: site.description,
        url: site.url,
        image: `${site.url}/products/bag-mk-vanilla-1.jpeg`,
        currenciesAccepted: site.currency,
        areaServed: "Kosovo, Albania, North Macedonia",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Prishtinë",
          addressCountry: "XK",
        },
        sameAs: [site.instagram.url],
      }}
    />
  );
}

export function ProductSchema({ product }: { product: Product }) {
  const off = discountPct(product);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${product.name} — ${product.brand}`,
        image: product.images.map((i) => `${site.url}${i}`),
        description: product.description,
        brand: { "@type": "Brand", name: product.brand },
        sku: product.slug,
        category: product.category,
        offers: {
          "@type": "Offer",
          url: `${site.url}/product/${product.slug}`,
          priceCurrency: site.currency,
          price: product.price,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          ...(off ? { priceValidUntil: "2026-12-31" } : {}),
        },
        // Only publish rating schema once the client has real reviews — never fabricate.
        ...(typeof product.rating === "number" && typeof product.reviews === "number"
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviews,
              },
            }
          : {}),
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${site.url}${it.url}`,
        })),
      }}
    />
  );
}
