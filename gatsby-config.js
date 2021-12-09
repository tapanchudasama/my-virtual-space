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
    "gatsby-plugin-postcss",
    "gatsby-plugin-preact",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]": "text-3xl lg:text-5xl py-4 font-bold ",
                "heading[depth=2]": "text-2xl lg:text-4xl py-4 font-bold",
                "heading[depth=3]": "text-xl lg:text-3xl py-4 font-bold",
                listItem: "text-lg lg:text-2xl font-bold pt-2 pb-4",
                paragraph: "lg:text-lg py-4 text-md",
                link: "underline hover:text-blue-600",
                break: "py-4",
              },
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-hashnode",
      options: {
        username: "inflame",
      },
    },
    {
      resolve: "gatsby-plugin-csp",
      options: {
        disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: true, // you can disable scripts sha256 hashes
        mergeStyleHashes: true, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          "script-src": "'self' www.google-analytics.com",
          "style-src": "'self' 'unsafe-inline'",
          "img-src": "'self' data: www.google-analytics.com",
          // you can add your directives or override defaults
        },
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
        name: "writings",
        path: `${__dirname}/content/writings`,
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
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        allPageHeaders: ["cache-control: public, max-age=31536000, immutable"],
      },
    },
  ],
};
