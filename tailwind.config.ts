import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#78350F",
          50: "#FEF7ED",
          100: "#FDECD3",
          200: "#FBD5A5",
          300: "#F8B86D",
          400: "#F59032",
          500: "#F27412",
          600: "#E35A08",
          700: "#BC4209",
          800: "#96350F",
          900: "#78350F",
          950: "#411906",
        },
        secondary: {
          DEFAULT: "#92400E",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#92400E",
        },
        accent: {
          DEFAULT: "#D97706",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        parchment: {
          DEFAULT: "#FFFBEB",
          50: "#FFFDF5",
          100: "#FFFBEB",
          200: "#FEF3C7",
          300: "#FDE68A",
          400: "#FCD34D",
        },
        ink: {
          DEFAULT: "#1C1917",
          50: "#F5F5F4",
          100: "#E7E5E4",
          200: "#D6D3D1",
          300: "#A8A29E",
          400: "#78716C",
          500: "#57534E",
          600: "#44403C",
          700: "#292524",
          800: "#1C1917",
          900: "#0C0A09",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Source Serif 4", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "parchment-texture": "url('/textures/parchment.png')",
        "gradient-warm": "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)",
        "gradient-sepia": "linear-gradient(180deg, #78350F 0%, #92400E 50%, #D97706 100%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        quill: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        quill: "quill 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
