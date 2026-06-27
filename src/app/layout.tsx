import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTABar } from "@/components/MobileCTABar";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { WishlistProvider } from "@/components/WishlistProvider";
import { SavedDrawerProvider } from "@/components/SavedDrawer";
import { OrganizationSchema } from "@/components/Schema";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { getLocale } from "@/lib/i18n/server";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Affordable Luxury Women's Fashion`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "women's fashion",
    "designer bags",
    "Zara bags",
    "Michael Kors",
    "Guess bags",
    "dresses",
    "jackets",
    "Kosovo fashion",
    "Prishtina",
    "affordable luxury",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Affordable Luxury Women's Fashion`,
    description: site.description,
    images: [{ url: "/products/bag-mk-vanilla-1.jpeg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Affordable Luxury Women's Fashion`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16130F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-dvh">
        <OrganizationSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]
            focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <LocaleProvider initialLocale={locale}>
          <WishlistProvider>
            <SavedDrawerProvider>
              <Navbar />
              <main id="main" className="pb-20 lg:pb-0">
                {children}
              </main>
              <Footer />
              <MobileCTABar />
              <NewsletterPopup />
            </SavedDrawerProvider>
          </WishlistProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
