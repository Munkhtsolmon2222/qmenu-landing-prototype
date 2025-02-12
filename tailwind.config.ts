// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;

import tailwindcssAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./globals.css",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "current-3": "hsl(var(--current-3))",
        "current-2": "hsl(var(--current-2))",
        "current-1": "hsl(var(--current-1))",
        current: "hsl(var(--current))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          text: "hsl(var(--secondary-text))",
          background: "hsl(var(--secondary-background))",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        dissolve: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
            borderWidth: "2px",
          },
          "100%": {
            transform: "scale(3)",
            opacity: "0",
            borderWidth: "0",
          },
        },
      },
      animation: {
        dissolve: "dissolve 2s ease-out infinite",
        "ping-slow": "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      dropShadow: {
        "3xl": "35px 35px 35px rgba(255, 255, 255, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      backgroundImage: {
        "stripe-pattern":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 0))",
      },
      backgroundSize: {
        "stripe-size": "20px 20px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
