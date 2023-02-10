/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        origin: "#2F436E",
        bg: "#f1f5f9",
        modalbg: "black/70"
      },
    },
  },
  plugins: [],
};
