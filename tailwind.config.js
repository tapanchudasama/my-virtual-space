module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fill: (theme) => ({
        "red-500": theme("colors.red.500"),
      }),
      fontFamily: {
        body: ["IBM Plex Sans"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
