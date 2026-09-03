import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        heading: "hsl(var(--heading))",
        muted: "hsl(var(--muted))",
        rule: "hsl(var(--rule))",
      },
      fontFamily: {
        // Both stacks copied from the reference site: Inter for everything,
        // Lora (italic only) for the nav.
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Baskerville",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      fontSize: {
        base: ["0.9375rem", { lineHeight: "1.75rem" }],
      },
    },
  },
  plugins: [],
};
export default config;
