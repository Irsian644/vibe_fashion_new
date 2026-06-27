"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Heart, Menu, Search, X, Instagram } from "lucide-react";
import { site } from "@/lib/site";
import { useWishlist } from "./WishlistProvider";
import { SearchPanel } from "./SearchPanel";
import { MegaMenu } from "./MegaMenu";
import { LangToggle } from "./LangToggle";
import { useSavedDrawer } from "./SavedDrawer";
import { registerWishlistTarget } from "./wishlist-fly";
import { useT } from "@/lib/i18n/LocaleProvider";
import { NAV_ITEMS } from "@/lib/i18n/nav";

export function Navbar() {
  const t = useT();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { wishlist, ready } = useWishlist();
  const { openDrawer } = useSavedDrawer();

  // Fly-to-heart target: clones land here, then the heart pops.
  const heartRef = useRef<HTMLButtonElement>(null);
  const heartControls = useAnimationControls();
  useEffect(() => {
    return registerWishlistTarget(
      () => heartRef.current?.getBoundingClientRect() ?? null,
      () =>
        heartControls.start({
          scale: [1, 1.35, 1],
          transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
        }),
    );
  }, [heartControls]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock scroll when overlays open
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-center text-[11px] uppercase tracking-luxe text-cream">
        <div className="container-luxe py-2">{t("nav.announce")}</div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-luxe ${
          scrolled
            ? "border-b border-ink/10 bg-cream/90 backdrop-blur-md shadow-soft"
            : "border-b border-transparent bg-cream"
        }`}
      >
        <nav className="container-luxe flex h-16 items-center justify-between gap-4">
          {/* Left: mobile menu + desktop links */}
          <div className="flex items-center gap-1 lg:gap-7">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand lg:hidden"
              aria-label={t("nav.openMenu")}
            >
              <Menu className="h-5 w-5" />
            </button>
            <MegaMenu />
          </div>

          {/* Center: logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-center"
            aria-label={`${site.name} home`}
          >
            <span className="block font-serif text-2xl font-semibold leading-none tracking-[0.02em] text-ink sm:text-[26px]">
              VIBE
            </span>
            <span className="block text-[9px] uppercase tracking-[0.5em] text-stone">
              Fashion
            </span>
          </Link>

          {/* Right: actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <LangToggle className="mr-1 hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand"
              aria-label={t("nav.search")}
            >
              <Search className="h-5 w-5" />
            </button>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand sm:inline-flex"
              aria-label="Vibe Fashion on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <motion.button
              ref={heartRef}
              type="button"
              animate={heartControls}
              onClick={openDrawer}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand [will-change:transform]"
              aria-label={`${t("nav.saved")}, ${wishlist.length}`}
            >
              <Heart className={`h-5 w-5 ${ready && wishlist.length > 0 ? "fill-sale text-sale" : ""}`} />
              {ready && wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink">
                  {wishlist.length}
                </span>
              )}
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[70] flex w-[86%] max-w-sm flex-col bg-cream lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-label={t("nav.menu")}
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <span className="font-serif text-xl font-semibold">{t("nav.menu")}</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-sand"
                  aria-label={t("nav.closeMenu")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto px-5 py-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href} className="border-b border-ink/5">
                    <Link href={item.href} className="block py-4 font-serif text-2xl text-ink">
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-ink/10 px-5 py-5">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-stone"
                >
                  <Instagram className="h-4 w-4" /> @{site.instagram.handle}
                </a>
                <LangToggle />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
