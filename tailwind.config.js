/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#33B8AD",
        primaryLight: "#00A699",
        secondary: "#99DBD6",
        secondaryLight: "#CCEDEB",
        tertiary: "#D9D9D9",
        textPrimary: "#333333",
      },
      borderRadius: {
        full: "43px",
      },
      fontFamily: { Inter: ["Inter", "serif"] },
      animation: {
        fadeIn: "fadeIn 0.2s ",
        fadeIn1: "fadeIn 1s ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
