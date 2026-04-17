import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — earthy, natural tones
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
        },
        brand: {
          DEFAULT: "#5c4a32",
          light: "#8a7060",
        },
      },
      fontFamily: {
        sans: ["Verdana", "Geneva", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
