/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // pizza: "Roboto Mono, monospace",
      // we overrided the default sans font tailwind gives us
      sans: "Roboto Mono, monospace",
    },
    extend: {
      screens: "100dvh",
    },
  },
  plugins: [],
};
