module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "6rem",
        lg: "8rem",
        xl: "8rem",
        "2xl": "10rem",
      },
    },
    extend: {
      fill: (theme) => ({
        "red-500": theme("colors.red.500"),
      }),
      fontFamily: {
        oxygen: ["Arvo", "serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white"),
            a: {
              color: theme("colors.blue[100]"),
              fontWeight: "bold",
              "&:hover": {
                color: theme("colors.blue[500]"),
              },
            },
            maxWidth: "100ch",
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
