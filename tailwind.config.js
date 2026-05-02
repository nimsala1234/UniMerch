/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3D0C0C",      // dark maroon
        accent: "#C0591A",       // burnt orange
        cream: "#FBF5E6",        // light background
        cardBg: "#FFF8EC",       // card background
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};