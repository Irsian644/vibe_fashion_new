"use client";

import { motion } from "framer-motion";

/**
 * Route transition. A `template` remounts on every navigation, so this gives a
 * soft editorial cross-fade between pages. Opacity-only on purpose — animating a
 * transform here would break `position: sticky` descendants (navbar, filters).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
