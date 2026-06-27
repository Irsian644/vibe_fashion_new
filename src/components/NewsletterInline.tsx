"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire up to your ESP endpoint here.
    setDone(true);
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-stone">
        <Check className="h-4 w-4 text-gold" /> Thanks — welcome to the list.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex max-w-xs items-center gap-2">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        placeholder="Email for new drops"
        className="h-11 flex-1 rounded-full border border-ink/20 bg-white px-4 text-sm text-ink outline-none focus:border-gold"
      />
      <button
        type="submit"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-colors hover:bg-charcoal"
        aria-label="Subscribe"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
