"use client";

import { Truck, ShieldCheck, RotateCcw, Instagram } from "lucide-react";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { MessageKey } from "@/lib/i18n/messages";

const items: { icon: typeof Truck; title: MessageKey; desc: MessageKey }[] = [
  { icon: ShieldCheck, title: "trust.authentic.title", desc: "trust.authentic.desc" },
  { icon: Truck, title: "trust.shipping.title", desc: "trust.shipping.desc" },
  { icon: RotateCcw, title: "trust.returns.title", desc: "trust.returns.desc" },
  { icon: Instagram, title: "trust.instagram.title", desc: "trust.instagram.desc" },
];

export function TrustBar() {
  const t = useT();
  return (
    <section aria-label="Why shop with us" className="border-y border-ink/10 bg-cream">
      <div className="container-luxe grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <it.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-semibold text-ink">{t(it.title)}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-stone">{t(it.desc)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
