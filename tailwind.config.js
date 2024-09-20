/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0A192F',
        'secondary': '#F97316',
        'tertiary': '#54D6BB',
      },
    },
    screens: {
      sm: { max: '1000px' },
      lg: { max: '2023px' },
    }
  },
  plugins: [],
}