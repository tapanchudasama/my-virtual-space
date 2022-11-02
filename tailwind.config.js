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
        xl: "6rem",
        "2xl": "8rem",
      },
    },
    extend: {
      fill: (theme) => ({
        ...theme.colors,
      }),
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white"),
            "--tw-prose-headings": theme("colors.white"),
            a: {
              borderBottom: "1px solid white",
              color: theme("colors.white"),
              fontWeight: "bold",
              paddingLeft: rem(1),
              paddingRight: rem(1),
              textDecoration: "none",
              "&:hover": {
                borderBottomColor: theme("colors.blue.400"),
                color: theme("colors.blue.400"),
              },
            },
            strong: {
              color: theme("colors.white"),
            },
            em: {
              fontSize: rem(16),
              fontStyle: "normal",
              fontWeight: "normal",
              color: theme("colors.gray.400"),
            },
            ul: {
              listStyleType: "square",
              fontFamily: "Work Sans",
            },
            h1: {
              fontFamily: "Playfair Display",
            },
            h2: {
              fontFamily: "Playfair Display",
            },
            h3: {
              fontFamily: "Playfair Display",
            },
            h4: {
              fontFamily: "Playfair Display",
            },
            h5: {
              fontFamily: "Playfair Display",
            },
            h6: {
              fontFamily: "Playfair Display",
            },
            p: {
              fontFamily: "Work Sans",
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
