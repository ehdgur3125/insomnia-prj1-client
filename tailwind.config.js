module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      "1/6": '16.67%',
      "1/10": "10%"
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
