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
    "gatsby-plugin-webpack-bundle-analyser-v2",
    "gatsby-transformer-json",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-hashnode",
      options: {
        username: "inflame",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `tapan chudasama`,
        start_url: `/`,
        display: `standalone`,
        icon: "src/images/me.png",
        background_color: `#FFFFFF`,
        theme_color: `#1A202C`,
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
        isUsingColorMode: false,
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
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-RETTTMCQHS", // Google Analytics / GA
        ],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
  ],
};
