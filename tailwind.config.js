module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      "1/6": '16.67%',
      "1/10": "10%"
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'me': ["Noto Sans KR", "Apple SD Gothic Neo", "맑은 고딕", "Malgun Gothic", "sans-serif"]
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
