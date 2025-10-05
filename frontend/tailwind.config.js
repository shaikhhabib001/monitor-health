/* eslint-env node */

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cool-teal': '#14B8A6',
        'fresh-lime': '#A3E635',
        'dark-background': '#1A202C',
        'light-card': '#2D3748',
        'light-text': '#E2E8F0',
        'medium-text': '#A0AEC0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}