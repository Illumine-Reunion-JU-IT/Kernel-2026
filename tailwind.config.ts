import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2.5rem", xl: "4rem" },
      screens: { "2xl": "1440px" }
    },
    extend: {
      colors: {
        ink: "var(--ink)",
        /* Green dropped: these now map to the poster's charcoal blacks. */
        forest: { DEFAULT: "#0f0f13", deep: "#09090c", soft: "#1a1a20" },
        sand: { DEFAULT: "#E9DFC5", dim: "#B6B39F" },
        volt: "#9A4DFF",
        signal: "#E40908",
        void: "#050308"
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        condensed: ["var(--font-condensed)", "Impact", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      spacing: { section: "clamp(5rem, 12vw, 11rem)" },
      screens: { xs: "420px" },
      keyframes: {
        hint: { "0%": { transform: "translateY(-100%)", opacity: "0" }, "40%": { opacity: "1" }, "100%": { transform: "translateY(300%)", opacity: "0" } },
        marquee: { to: { transform: "translateX(-50%)" } }
      },
      transitionTimingFunction: { snap: "cubic-bezier(0.7, 0, 0.1, 1)" }
    }
  },
  plugins: []
};

export default config;
