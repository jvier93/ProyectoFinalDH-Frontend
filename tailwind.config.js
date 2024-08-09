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
      },
      borderRadius: {
        'full':'43px'
      },
      fontFamily: { Inter: ["Inter", "serif"] },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
