import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
      boxShadow: {
        // shadow-modal
        'modal': 'hsl(0 0% 0% / 10%) 0 0 0.5rem 0.25rem',
      },
      colors: {
        "cs-white": "#f7f7f7",
        "cs-black": "#131200",
        // yellow
        primary: "#f0e800",
        // red
        secondary: "#FF4B2B",
        terciary: "#0072b0",
        "cs-gray": {
          100: "#e5e7eb",
          200: "#4b5563",
          300: "#374151"
        }
      }
    },
  },
  plugins: [],
};
export default config;
