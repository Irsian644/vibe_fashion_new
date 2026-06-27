"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type WishlistContextType = {
  wishlist: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  recentlyViewed: string[];
  addRecent: (slug: string) => void;
  ready: boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

const WL_KEY = "vibe_wishlist";
const RV_KEY = "vibe_recently_viewed";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setWishlist(JSON.parse(localStorage.getItem(WL_KEY) || "[]"));
      setRecentlyViewed(JSON.parse(localStorage.getItem(RV_KEY) || "[]"));
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  const toggle = useCallback((slug: string) => {
    setWishlist((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(WL_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const has = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const addRecent = useCallback((slug: string) => {
    setRecentlyViewed((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, 8);
      localStorage.setItem(RV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, has, recentlyViewed, addRecent, ready }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
