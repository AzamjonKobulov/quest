import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1320px",
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        gilroy: ["var(--font-gilroy)"],
      },
      colors: {
        brand: {
          main: "#F8BC0F",
          secondary: "#F6A819",
        },
        gray: {
          "100": "#151515",
          "200": "#0D0D0D",
        },
      },
      borderImage: {
        "gradient-border": "linear-gradient(to right, #F6A819, #F8470F) 1",
      },
      backgroundImage: {
        "quest-1":
          "linear-gradient(90deg, #151515 29.79%, rgba(21, 21, 21, 0.759) 57.34%, rgba(21, 21, 21, 0) 92.26%)",
        "quest-2":
          "linear-gradient(180deg, #151515 0%, rgba(21, 21, 21, 0) 60%, rgba(21, 21, 21, 0.978485) 100%)",
      },
      boxShadow: {
        "custom-shadow": "0px 0px 6px 0px #F6A819",
        "inset-default-button": "inset 0px 0px 6.3px 0px rgba(30, 20, 2, 0.40)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
