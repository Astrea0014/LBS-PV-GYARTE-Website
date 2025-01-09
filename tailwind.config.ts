import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        complementary: "var(--complementary)",
        footer: "var(--footer-bg)",
        textLight: "var(--text-light)",
        textDark: "var(--text-dark)",
      },
    },
  },
  plugins: [],
} satisfies Config;
