import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — warm neutral luxury (beige / cream / black / white / gold)
        cream: "#F7F3EC",
        sand: "#EDE6DA",
        beige: "#D9CBB7",
        taupe: "#A99B86",
        ink: "#16130F", // near-black, warm
        charcoal: "#33302B",
        stone: "#6E665A",
        gold: {
          DEFAULT: "#B6924D", // accessible gold (AA on cream/white for large+UI)
          soft: "#C7A867",
          deep: "#8C6E37",
        },
        sale: "#9B3B2E", // muted terracotta-red for discounts (4.5:1 on cream)
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.18em",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(22,19,15,0.04), 0 8px 24px rgba(22,19,15,0.06)",
        lift: "0 12px 40px rgba(22,19,15,0.12)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Slow-drifting hero "aurora" orbs (GPU-friendly: transform only)
        "aurora-1": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(8%, 6%, 0) scale(1.15)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.1)" },
          "50%": { transform: "translate3d(-10%, -8%, 0) scale(0.95)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 32s linear infinite",
        "aurora-1": "aurora-1 16s ease-in-out infinite",
        "aurora-2": "aurora-2 20s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
