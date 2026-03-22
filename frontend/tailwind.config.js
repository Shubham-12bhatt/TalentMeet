/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        dark: "#1a1a1a",
        light: "#f8f9fa",
      },
    },
  },
  plugins: [],
}
