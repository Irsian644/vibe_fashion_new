import type { MessageKey } from "./messages";

/** Navigation items with translation keys (labels come from the dictionary). */
export const NAV_ITEMS: { href: string; key: MessageKey }[] = [
  { href: "/shop", key: "nav.shop" },
  { href: "/shop?category=bags", key: "nav.bags" },
  { href: "/shop?category=dresses", key: "nav.dresses" },
  { href: "/shop?category=jackets", key: "nav.jackets" },
  { href: "/about", key: "nav.about" },
  { href: "/faq", key: "nav.faq" },
  { href: "/contact", key: "nav.contact" },
];

/** Category keys → translation keys (label + blurb). */
export const CATEGORY_KEYS: Record<string, { label: MessageKey; blurb?: MessageKey }> = {
  bags: { label: "cat.bags", blurb: "cat.bags.blurb" },
  dresses: { label: "cat.dresses", blurb: "cat.dresses.blurb" },
  jackets: { label: "cat.jackets", blurb: "cat.jackets.blurb" },
  accessories: { label: "cat.accessories" },
};
