/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#fff",
        "secondary-bg": "rgb(153, 255, 255)",
        "accent": "rgb(0, 0, 204)"
      },
      fontFamily: {
        sans: ['Comic Sans MS'],
      },
    },

    plugins: []
  }
}
