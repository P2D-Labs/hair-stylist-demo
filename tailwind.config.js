import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // rgb(var(...) / <alpha-value>) is the pattern Tailwind needs so
          // opacity modifiers (e.g. bg-brand-paper/90) actually work — a
          // bare var(--color-x) can't have alpha injected into it and
          // silently produces invalid, transparent CSS instead.
          primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
          "primary-dark": "rgb(var(--color-primary-dark-rgb) / <alpha-value>)",
          "primary-light": "rgb(var(--color-primary-light-rgb) / <alpha-value>)",
          secondary: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
          "secondary-light": "rgb(var(--color-secondary-light-rgb) / <alpha-value>)",
          "secondary-dark": "rgb(var(--color-secondary-dark-rgb) / <alpha-value>)",
          accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
          "accent-light": "rgb(var(--color-accent-light-rgb) / <alpha-value>)",
          "accent-dark": "rgb(var(--color-accent-dark-rgb) / <alpha-value>)",
          ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
          "ink-soft": "rgb(var(--color-ink-soft-rgb) / <alpha-value>)",
          paper: "rgb(var(--color-paper-rgb) / <alpha-value>)",
          "paper-muted": "rgb(var(--color-paper-muted-rgb) / <alpha-value>)",
          line: "rgb(var(--color-line-rgb) / <alpha-value>)",
        },
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
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        label: ["var(--font-label)"],
      },
      transitionTimingFunction: {
        epoch: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
