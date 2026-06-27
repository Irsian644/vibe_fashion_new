"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type Item = { title: string; content: React.ReactNode };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-sm font-medium uppercase tracking-[0.08em] text-ink">
                {it.title}
              </span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-stone" />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-stone" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-sm leading-relaxed text-charcoal">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
