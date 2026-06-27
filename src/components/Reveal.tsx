"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  /**
   * "scroll" (default) reveals when the group scrolls into view.
   * "mount" plays immediately on mount — use for content that can change in
   * place (e.g. filtered results), where a scroll trigger may never re-fire.
   */
  trigger = "scroll",
}: {
  children: React.ReactNode;
  className?: string;
  trigger?: "scroll" | "mount";
}) {
  const triggerProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, margin: "-60px" } };

  return (
    <motion.div className={className} variants={staggerContainer} initial="hidden" {...triggerProps}>
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
