/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',
        'secondary': '#f7e68f',
        'tertiary': '#fc66c1',
        'quaternary': '#614c46',
      },
    },
    screens: {
      sm: { max: '1000px' },
      lg: { max: '2023px' },
    }
  },
  plugins: [],
}