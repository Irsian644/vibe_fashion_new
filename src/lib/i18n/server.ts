import { cookies } from "next/headers";
import { messages, type Locale, type MessageKey, DEFAULT_LOCALE, LOCALES } from "./messages";

const COOKIE = "vibe_locale";

/** Read the visitor's locale from the cookie in a Server Component. */
export function getLocale(): Locale {
  const c = cookies().get(COOKIE)?.value;
  return c && LOCALES.includes(c as Locale) ? (c as Locale) : DEFAULT_LOCALE;
}

/** Server-side translator (for metadata, server components). */
export function getT(locale: Locale = getLocale()) {
  return (key: MessageKey, vars?: Record<string, string | number>) => {
    const raw = messages[locale][key] ?? messages.en[key] ?? key;
    return vars
      ? raw.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`))
      : raw;
  };
}
