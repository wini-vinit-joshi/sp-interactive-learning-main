/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
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
