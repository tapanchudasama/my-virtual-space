module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fill: (theme) => ({
        "red-500": theme("colors.red.500"),
      }),
      fontFamily: {
        oxygen: ["Oxygen", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
