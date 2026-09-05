import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
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
        surface: {
          DEFAULT: "#FAFAF9",
          card: "#FFFFFF",
          raised: "#FFFFFF",
          muted: "#F5F5F4",
        },
        border: {
          DEFAULT: "#E7E5E4",
          subtle: "#F0EFED",
          focus: "#059669",
        },
        text: {
          primary: "#1C1917",
          secondary: "#78716C",
          muted: "#A8A29E",
          inverse: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#059669",
          hover: "#047857",
          light: "#ECFDF5",
          ring: "rgba(5, 150, 105, 0.15)",
        },
        destructive: {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
          light: "#FEF2F2",
        },
      },
      fontSize: {
        xxs: '11px',
        'display-lg': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-md': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
        'mono': ['0.8125rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      borderRadius: {
        'card': '12px',
        'input': '8px',
        'button': '8px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(28, 25, 23, 0.06)',
        'soft-md': '0 1px 2px rgba(28, 25, 23, 0.04), 0 4px 12px rgba(28, 25, 23, 0.08)',
        'soft-lg': '0 2px 4px rgba(28, 25, 23, 0.04), 0 8px 24px rgba(28, 25, 23, 0.1)',
        'inner-soft': 'inset 0 1px 2px rgba(28, 25, 23, 0.06)',
        'accent': '0 0 0 3px rgba(5, 150, 105, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/forms'),],
} satisfies Config

export default config
