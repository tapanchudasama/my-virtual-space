require("dotenv").config({
  path: `.env`,
});
module.exports = {
  siteMetadata: {
    title: "tapan chudasama",
    siteUrl: "https://www.tapan.app",
    name: "tapan chudasama",
    description: "welcome to my virtual space.",
    image: "/me.jpg",
    twitterUsername: "@tapanchudasama7",
  },
  plugins: [
    "gatsby-source-hashnode-api",
    "gatsby-transformer-json",
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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "readings",
        path: `${__dirname}/content/readings`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "status-quo",
        path: `${__dirname}/content/sections/status-quo`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "social-media",
        path: `${__dirname}/content/sections/hero/social-media.json`,
      },
    },
    {
      resolve: `gatsby-source-spotify`,
      options: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,

        fetchPlaylists: true, // optional. Set to false to disable fetching of your playlists
        fetchRecent: true, // optional. Set to false to disable fetching of your recently played tracks
        timeRanges: ["short_term", "medium_term", "long_term"], // optional. Set time ranges to be fetched
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: process.env.GITHUB_PAT,
        graphQLQuery: `
        query ($author: String = "tapanchudasama") {
            user(login: $author) {
              contributionsCollection {
                hasAnyContributions
                contributionYears
              }
              repositoriesContributedTo(first: 100) {
                totalCount
              }
              createdAt
              repositories(first:100) {
                totalCount
                edges {
                  node {
                  stargazers {
                    totalCount
                  }
                  languages(first: 100, orderBy: {direction: DESC, field: SIZE}) {
                    totalCount
                    # still figuring out how pagination works
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        name
                        color
                      }
                      size
                    }
                  }
                    name
                    milestones(first:100){
                      edges{
                        node{
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
        }`,
      },
    },
  ],
};
