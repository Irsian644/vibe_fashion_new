"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bag } from "./icons";
import { InstagramIcon } from "./InstagramOrderButton";
import { instagramDmLink } from "@/lib/site";
import { useT } from "@/lib/i18n/LocaleProvider";

/**
 * Persistent thumb-friendly bottom bar for Instagram traffic (mobile only).
 * Hidden on product pages, which render their own contextual sticky CTA.
 */
export function MobileCTABar() {
  const t = useT();
  const pathname = usePathname();
  if (pathname?.startsWith("/product/")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 backdrop-blur-md lg:hidden">
      <div className="container-luxe grid grid-cols-2 gap-2 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <Link href="/shop" className="btn-outline">
          <Bag className="h-[18px] w-[18px]" />
          {t("cta.shopNow")}
        </Link>
        <a
          href={instagramDmLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-instagram"
          data-analytics="instagram-order"
        >
          <InstagramIcon className="h-[18px] w-[18px]" />
          {t("cta.messageUs")}
        </a>
      </div>
    </div>
  );
}
