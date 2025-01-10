import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        footer: "var(--footer-bg)",
        navbar: "var(--nav-bg)",
        light: "var(--text-light)",
        dark: "var(--text-dark)",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(150%)" },
          "100%": { transform: "translateX(0)" },
        }, 
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translate(150%)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.75s ease-out forwards",
        slideOut: "slideOut 0.75s ease-out forwards",
      }, 
    },
  },
  plugins: [],
} satisfies Config;
