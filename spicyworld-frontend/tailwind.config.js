/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F57C00", // Spicy Orange
        secondary: "#FF9800",
        accent: "#D84315", // Deep Red/Clay
        bgCreme: "#FDF8F1", // Lighter Cream
        dark: "#1A1A1A",
        grayCustom: "#4A4A4A",
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
