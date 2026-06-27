"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Locale, type MessageKey, DEFAULT_LOCALE, LOCALES } from "./messages";

const COOKIE = "vibe_locale";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Translate a key, with optional {placeholder} interpolation. */
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<Ctx | null>(null);

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function LocaleProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Keep <html lang> in sync and persist choice.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    if (!LOCALES.includes(l)) return;
    setLocaleState(l);
    // 1 year cookie; readable by the server for first-paint locale.
    document.cookie = `${COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) =>
      interpolate(messages[locale][key] ?? messages.en[key] ?? key, vars),
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

/** Convenience: just the translate fn. */
export function useT() {
  return useLocale().t;
}
