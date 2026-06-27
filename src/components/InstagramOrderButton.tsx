"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { instagramDmLink } from "@/lib/site";
import { useT } from "@/lib/i18n/LocaleProvider";

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * The store's real checkout. Instagram has no prefilled-DM deep link, so we copy
 * the order text to the clipboard, confirm it, then open the DM thread for the
 * buyer to paste. Drop-in replacement for the old WhatsApp button (same `message`).
 */
export function InstagramOrderButton({
  message,
  children,
  className = "btn-instagram w-full",
}: {
  message: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      /* clipboard blocked — still open the DM */
    }
    window.open(instagramDmLink(), "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" onClick={onClick} className={className} data-analytics="instagram-order">
      {copied ? (
        <>
          <Check className="h-[18px] w-[18px]" />
          {t("cta.orderInstagramCopied")}
        </>
      ) : (
        <>
          <InstagramIcon className="h-[18px] w-[18px]" />
          {children ?? t("cta.orderInstagram")}
        </>
      )}
    </button>
  );
}
