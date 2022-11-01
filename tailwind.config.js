const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

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
        sm: "2rem",
        lg: "3rem",
        xl: "6rem",
        "2xl": "8rem",
      },
    },
    extend: {
      fill: (theme) => ({
        "red-500": theme("colors.red.500"),
      }),
      fontFamily: {
        oxygen: ["Merriweather", "serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white"),
            "--tw-prose-headings": theme("colors.white"),
            a: {
              color: theme("colors.blue[100]"),
              fontWeight: "bold",
              "&:hover": {
                color: theme("colors.blue[500]"),
              },
            },
            strong: {
              color: theme("colors.white"),
            },
            maxWidth: "100ch",
          },
        },
        lg: {
          css: {
            fontSize: rem(18),
            h4: {
              fontSize: rem(20),
            },
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
