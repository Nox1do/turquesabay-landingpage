/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        'summer-vibes': ['Summer Vibes', 'cursive']
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
