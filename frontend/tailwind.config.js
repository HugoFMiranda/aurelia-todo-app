/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.html'],
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
