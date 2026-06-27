export const site = {
  name: "Vibe Fashion",
  shortName: "Vibe",
  tagline: "Affordable luxury, delivered with love.",
  description:
    "Vibe Fashion — designer-inspired bags, dresses and jackets for women. Authentic Zara, Guess, Michael Kors & more. Order via Instagram, shipped across Kosovo & the region.",
  // Update this to your production domain before launch
  url: "https://vibefashion.example",
  locale: "en",
  currency: "EUR",
  currencySymbol: "€",
  location: "Prishtinë, Kosovë",

  instagram: {
    handle: "vibe_fashion_new",
    url: "https://instagram.com/vibe_fashion_new",
    // Opens straight to the DM thread on devices with the app; falls back to web profile.
    dmUrl: "https://ig.me/m/vibe_fashion_new",
  },
  email: "hello@vibefashion.example",

  // ⚠️ Placeholder — confirm real shipping & returns terms with the client,
  // then fill these in. Copy across the site reads from here.
  shipping: {
    note: "Shipping & delivery are confirmed when you order in our DMs.",
    returns: "Returns are available — just message us.",
    domestic: "Kosovo",
    region: "Albania & North Macedonia",
  },

  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Bags", href: "/shop?category=bags" },
    { label: "Dresses", href: "/shop?category=dresses" },
    { label: "Jackets", href: "/shop?category=jackets" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;

/**
 * The Instagram DM link. Instagram has no "prefilled message" deep link, so the
 * order text is copied to the clipboard (see InstagramOrderButton) and the buyer
 * pastes it into the thread that ig.me opens.
 */
export function instagramDmLink(): string {
  return site.instagram.dmUrl;
}
