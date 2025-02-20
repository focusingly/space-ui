import typography from "@tailwindcss/typography";
import tailwindScrollbar from "tailwind-scrollbar";
import { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "auto-noise": "var(--theme-bg-noise)",
        "dark-noise": "var(--dark-bg-noise)",
        "light-noise": "var(--light-bg-noise)"
      }
    }
  },
  darkMode: "class",
  plugins: [
    typography,
    tailwindScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" }),
    function ({ addComponents, theme }) {
      addComponents({
        ".underline-anime": {
          position: "relative",
          textDecoration: "none"
        },
        ".underline-anime::after": {
          content: "''",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "0",
          height: "2px",
          backgroundColor: "transparent", // 动态通过类控制
          transition: "width 270ms ease-out"
        },
        ".underline-anime:hover::after": {
          width: "100%",
          backgroundColor: `var(--underline-color)`
        }
      });
    }
  ]
};

export default config;
