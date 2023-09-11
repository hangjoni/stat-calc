/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      gridTemplateColumns: {
        calc: "10px minmax(80px, 1fr) minmax(80px, 1fr) 10px minmax(80px, 1fr)",
      },
      colors: {
        greenMain: "#00bf6f",
        greenMinor: "#1ac67e",
        blueMain: "#05467e",
        blueMinor: "#1e598b",
      },
    },
  },
  plugins: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
};
