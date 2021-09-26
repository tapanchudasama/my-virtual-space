module.exports = {
  siteMetadata: {
    siteUrl: "https://www.tapan.app",

    name: "tapan chudasama",
    description: "welcome to my virtual space",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
        isUsingColorMode: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "about",
        path: `${__dirname}/content/sections/about`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-spotify`,
      options: {
        clientId: `84f322e7f3154b97bd512485e08aec99`,
        clientSecret: `b74dd388bc474cc3ab0a2009825c4358`,
        refreshToken: `AQAKcAMJbYh2TcNWZIpr__XGNS5zVCK88apQaYPZD8ibXWuhSPv8rEHUYH2EzJl8Vy7ihuFTFGmI5oxkjRULKT58lhNGadN3EIj5FGAlgZieT7GvOlkxNWuhD-cW-f7mdVQ`,

        fetchPlaylists: true, // optional. Set to false to disable fetching of your playlists
        fetchRecent: true, // optional. Set to false to disable fetching of your recently played tracks
        timeRanges: ["short_term", "medium_term", "long_term"], // optional. Set time ranges to be fetched
      },
    },
  ],
};
