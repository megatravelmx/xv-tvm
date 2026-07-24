import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060B24",
          900: "#0B1440",
        },
        blue: {
          600: "#0B52E0",
          500: "#0C5CFF",
          400: "#4B84FF",
          100: "#DCE8FF",
        },
        rose: {
          900: "#5C1338",
          800: "#7A1A49",
          600: "#C42569",
          500: "#E2377C",
          400: "#EA5C97",
          300: "#F189B4",
          200: "#F6ACC9",
          100: "#FBD3E3",
          50: "#FDE9F1",
        },
        gold: {
          500: "#D9A441",
          400: "#F2C265",
          300: "#F7D68C",
        },
        blush: "#FFF6FB",
        ink: "#1A1330",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0C5CFF 0%, #7749BD 50%, #E2377C 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #4B84FF 0%, #A166C9 50%, #EA5C97 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(6,11,36,0) 0%, rgba(6,11,36,0.85) 100%)",
      },
      boxShadow: {
        glow: "0 20px 60px -15px rgba(226,55,124,0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "cta-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(226,55,124,0.55)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 0 10px rgba(226,55,124,0)",
            transform: "scale(1.035)",
          },
        },
      },
      animation: {
        "cta-pulse": "cta-pulse 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
