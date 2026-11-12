import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{json,js,ts}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      tablet: "800px",
      lg: "1024px",
      xl: "1160px",
      "2xl": "1280px",
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        forest: {
          DEFAULT: "var(--bg)",
          panel: "var(--panel)",
          panel2: "var(--panel2)",
        },
        panel: "var(--panel)",
        panel2: "var(--panel2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        sand: {
          DEFAULT: "var(--green)",
          light: "#EEE5D0",
          dark: "#B6B39F",
        },
        brand: {
          green: "var(--bg)",
          beige: "var(--green)",
          purple: "var(--purple)",
          red: "var(--red)",
          black: "var(--black)",
          mint: "var(--mint)",
        },
        mint: "var(--mint)",
        purple: {
          DEFAULT: "var(--purple)",
          electric: "#9A4DFF",
        },
        red: {
          DEFAULT: "var(--red)",
          logo: "#FF2D2D",
        },
        black: {
          DEFAULT: "var(--black)",
        },
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      maxWidth: {
        wrap: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
