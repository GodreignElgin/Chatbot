/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        background: "#f8f9fa",
      },
      maxHeight: {
        '10-lines': '240px', // Approximate height for 10 lines
      }
    },
  },
  plugins: [],
};
