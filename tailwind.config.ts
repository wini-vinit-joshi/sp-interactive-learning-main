/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Axiforma', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#005981",
          light: "#0080b8",
          dark: "#004a6e",
        },
      },
    },
  },
  plugins: [],
};
