/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#33B8AD",
        secondary: "#99DBD6",
        tertiary: "#00A699",
      },
      fontFamily: { Inter: ["Inter", "serif"] },
    },
  },
  plugins: [],
};
