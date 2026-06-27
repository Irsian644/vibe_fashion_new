"use client";

import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import { useMagnetic } from "@/lib/interactions";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  /** Max drift toward cursor, px. */
  strength?: number;
  /** Activation padding around the box, px. */
  radius?: number;
  "aria-label"?: string;
};

type AsLink = CommonProps & { href: string; onClick?: never; type?: never };
type AsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * A button/link that leans toward the cursor with spring physics.
 * The inner label drifts at ~40% of the shell's offset, so the text
 * "trails" the container — a small parallax that reads as depth, not jitter.
 */
export function MagneticButton(props: AsLink | AsButton) {
  const { children, className, strength = 14, radius = 28 } = props;
  const { ref, x, y } = useMagnetic<HTMLDivElement>(strength, radius);
  const innerX = useTransform(x, (v) => v * 0.4);
  const innerY = useTransform(y, (v) => v * 0.4);

  const inner = (
    <motion.span style={{ x: innerX, y: innerY }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-flex [will-change:transform]"
    >
      {"href" in props && props.href ? (
        <Link href={props.href} className={className} aria-label={props["aria-label"]}>
          {inner}
        </Link>
      ) : (
        <button
          type={(props as AsButton).type ?? "button"}
          onClick={(props as AsButton).onClick}
          className={className}
          aria-label={props["aria-label"]}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
