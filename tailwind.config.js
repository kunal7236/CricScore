/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F3',
        parchment: '#EDE4D8',
        charcoal: '#2C2825',
        gold: '#B8956C',
        goldDark: '#A07D52',
        burgundy: '#8B4049',
        forest: '#4A5D4A',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
