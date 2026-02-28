import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        sage: {
          50: "#f6f7f4",
          100: "#e8eae2",
          200: "#d2d6c7",
          300: "#b4bba3",
          400: "#97a07f",
          500: "#7a8563",
          600: "#5f694c",
          700: "#4a523d",
          800: "#3d4333",
          900: "#343a2d",
          950: "#1a1e16",
        },
        terracotta: {
          50: "#fdf6f0",
          100: "#fae8d8",
          200: "#f4ceb0",
          300: "#edaf7e",
          400: "#e58a4b",
          500: "#df6e2a",
          600: "#d15820",
          700: "#ad431c",
          800: "#8b371e",
          900: "#712f1b",
          950: "#3d160c",
        },
        wheat: {
          50: "#fdfaef",
          100: "#f9f0d0",
          200: "#f3df9e",
          300: "#ecc96a",
          400: "#e6b43e",
          500: "#dd9a27",
          600: "#c3781e",
          700: "#a2581c",
          800: "#85461e",
          900: "#6e3b1c",
          950: "#3e1e0c",
        },
        forest: {
          50: "#f0f9f1",
          100: "#dbf0de",
          200: "#b9e1c0",
          300: "#8bca97",
          400: "#58ad68",
          500: "#37924a",
          600: "#277639",
          700: "#205e30",
          800: "#1c4b28",
          900: "#183e22",
          950: "#0b2213",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
