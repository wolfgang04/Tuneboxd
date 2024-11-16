/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jersey: ['"Jersey 10"', "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  plugins: [],
};
  