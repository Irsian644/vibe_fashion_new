"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_LUXE } from "@/lib/motion";
import { MagneticButton } from "./MagneticButton";
import { useT } from "@/lib/i18n/LocaleProvider";

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

// Each word rides up from below a clipping mask: y 110% → 0, opacity 0 → 1.
const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE_LUXE } },
};

function Word({ children }: { children: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span variants={word} className="inline-block [will-change:transform]">
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);

  // Headlines split into words for the staggered reveal (locale-aware).
  const lineOne = t("hero.line1").split(" ");
  const lineTwo = t("hero.line2").split(" ");

  // Parallax the aurora layer as the hero scrolls away (transform/opacity only).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-cream lg:min-h-[92vh]"
    >
      {/* ── Animated aurora canvas (no photo) — warm, light, on-brand ────── */}
      <motion.div style={{ y: auroraY }} className="absolute inset-0 -z-10 [will-change:transform]">
        {/* soft cream → sand wash */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#FBF8F2_0%,#F2E9DA_55%,#EADFCB_100%)]" />

        {/* drifting warm gold / beige orbs */}
        <div className="absolute left-[6%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-gold/30 blur-[100px] animate-aurora-1 motion-reduce:animate-none" />
        <div className="absolute bottom-[4%] right-[4%] h-[62vh] w-[62vh] rounded-full bg-gold-soft/40 blur-[120px] animate-aurora-2 motion-reduce:animate-none" />
        <div className="absolute left-[42%] top-[34%] h-[42vh] w-[42vh] rounded-full bg-beige/45 blur-[110px] animate-aurora-1 motion-reduce:animate-none" />

        {/* slow conic sheen sweeping behind the headline */}
        <div className="absolute left-1/2 top-1/2 h-[140vh] w-[140vh] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-[0.10] motion-reduce:animate-none [background:conic-gradient(from_0deg,transparent_0deg,#B6924D_60deg,transparent_140deg,transparent_220deg,#B6924D_300deg,transparent_360deg)]" />

        {/* fine grid + soft vignette for texture */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#16130F_1px,transparent_1px),linear-gradient(90deg,#16130F_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/30" />
      </motion.div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <motion.div style={{ y: contentY, opacity: fade }} className="container-luxe py-24">
        <motion.p
          className="eyebrow inline-flex items-center gap-2 text-gold-deep"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_LUXE }}
        >
          <span className="h-px w-8 bg-gold-deep/50" />
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          className="mt-5 max-w-4xl font-serif text-6xl font-medium leading-[0.98] tracking-[-0.015em] text-ink text-balance sm:text-8xl lg:text-[8.5rem]"
          variants={wordContainer}
          initial="hidden"
          animate="show"
        >
          <span className="flex flex-wrap gap-x-[0.25em]">
            {lineOne.map((w, i) => (
              <Word key={`a${i}`}>{w}</Word>
            ))}
          </span>
          <span className="flex flex-wrap gap-x-[0.25em] italic text-gold-deep">
            {lineTwo.map((w, i) => (
              <Word key={`b${i}`}>{w}</Word>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-md text-base leading-relaxed text-stone sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_LUXE, delay: 0.55 }}
        >
          {t("hero.sub")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_LUXE, delay: 0.68 }}
        >
          <MagneticButton href="/shop" className="btn-gold">
            {t("cta.shopCollection")}
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="/shop?category=bags"
            className="btn border border-ink/25 text-ink hover:bg-ink hover:text-cream"
          >
            {t("cta.exploreBags")}
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
