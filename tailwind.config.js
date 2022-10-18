/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        128: '32rem',
        136: '40rem',
        154: '55rem',
        162: '60rem',
      },
      colors: {
        'primary': '#1976d2',
      }
    },
  },
  plugins: [],
}
