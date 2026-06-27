"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LOCALES, type Locale } from "@/lib/i18n/messages";

const LABELS: Record<Locale, string> = { en: "EN", sq: "SQ" };

/**
 * Compact EN/SQ pill toggle. Stores the choice in a cookie (via the provider) so
 * it persists across visits and is available to the server on first paint.
 */
export function LangToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-ink/15 p-0.5 text-[11px] font-medium ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`rounded-full px-2 py-1 transition-colors ${
              active ? "bg-ink text-cream" : "text-stone hover:text-ink"
            }`}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
