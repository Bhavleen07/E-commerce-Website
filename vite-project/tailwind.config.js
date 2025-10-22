/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        cratejoy: ["Pacifico", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        cinzel: ["Cinzel Decorative", "serif"],
        vibes: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
  darkMode: "class", // optional
};
