"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { site } from "@/lib/site";

const STORAGE_KEY = "vibe_newsletter_seen";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
      cleanup();
    };

    // Time-based (8s) OR exit-intent (cursor leaves toward top) — whichever first
    const timer = setTimeout(trigger, 8000);
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseout", onMouseOut);

    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    }
    return cleanup;
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire up to your ESP (Klaviyo/Mailchimp) endpoint here.
    setDone(true);
    setTimeout(() => setOpen(false), 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-ink/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[110] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-cream shadow-lift"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter offer"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-sand"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-7 py-9 text-center">
              {done ? (
                <div className="py-6">
                  <p className="font-serif text-3xl text-ink">You&apos;re in. ✨</p>
                  <p className="mt-2 text-stone">Check your inbox for your 10% code.</p>
                </div>
              ) : (
                <>
                  <p className="eyebrow">First order offer</p>
                  <h2 className="mt-3 font-serif text-4xl leading-tight text-ink">
                    Take 10% off
                  </h2>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-stone">
                    Join the {site.name} list for early access to new drops and a code for your
                    first order.
                  </p>
                  <form onSubmit={submit} className="mt-6 space-y-3">
                    <label htmlFor="nl-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="nl-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="your@email.com"
                      className="h-12 w-full rounded-full border border-ink/20 bg-white px-5 text-center text-ink outline-none focus:border-gold"
                    />
                    <button type="submit" className="btn-gold w-full">
                      Get my 10% code
                    </button>
                  </form>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-4 text-xs text-taupe underline underline-offset-2 hover:text-stone"
                  >
                    No thanks, I&apos;ll pay full price
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
