import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products, CATEGORIES } from "@/lib/products";
import { policySlugs } from "@/lib/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/wishlist`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/shop?category=${c.key}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const policyPages: MetadataRoute.Sitemap = policySlugs.map((slug) => ({
    url: `${base}/policies/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...policyPages];
}
