import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        kernel: {
          background: "#0B241A",
          panel: "#123729",
          panelSecondary: "#183F30",
          beige: "#E9DFC5",
          ink: "#EEE5D0",
          muted: "#B6B39F",
          purple: "#9A4DFF",
          mint: "#B77CFF",
          red: "#FF2D2D"
        }
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"]
      },
      maxWidth: {
        container: "1160px"
      }
    }
  },
  plugins: []
};

export default config;
