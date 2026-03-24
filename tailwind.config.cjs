/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080304",
        surface: "#13080a",
        glow: "#ff3b3b",
        mist: "#f3eded"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 30px 80px rgba(0,0,0,0.35)"
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.6rem",
        sm: "0.45rem"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
