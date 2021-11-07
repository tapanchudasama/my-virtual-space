import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import { letter, sentence } from "../components/about";
import Layout from "../components/layout";
import Seo from "../components/seo";

const HEADING = "readings";

const Readings = () => {
  const data = useStaticQuery(graphql`
    query ReadingsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/readings/" } }
      ) {
        nodes {
          id
          frontmatter {
            title
            tags
            slug
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 150
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  `);
  const headingAnimation = useAnimation();
  const contentAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      await headingAnimation.start("visible");
      await contentAnimation.start("visible");
    }
    sequence();
  }, [contentAnimation, headingAnimation]);

  const { allMarkdownRemark } = data;
  return (
    <div>
      <Layout>
        <div className="container mx-auto px-4 lg:px-16 font-ibm-plex-sans">
          <Seo titleTemplate="%s · readings" />
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl py-6 flex space-x-2 leading-tight font-bold"
            initial="hidden"
            display="flex"
            variants={sentence}
            animate={headingAnimation}
          >
            {HEADING.split(" ").map((char, index) => {
              return (
                <motion.p key={char + "-" + index} variants={letter}>
                  {char}
                </motion.p>
              );
            })}
          </motion.p>
          <div className="flex pb-8">
            {allMarkdownRemark.nodes.map((n) => {
              return (
                <div className="flex flex-col items-start p-2 rounded-8">
                  <motion.h3 className="text-md lg:text-lg cursor-pointer hover:text-gray-400">
                    {n.frontmatter.title}
                  </motion.h3>
                  <div
                    className="flex flex-col space-y-4 items-center lg:items-start"
                    direction="column"
                    spacing={4}
                  >
                    <div>
                      <GatsbyImage
                        style={{ borderRadius: "4px" }}
                        image={getImage(n.frontmatter.image)}
                        alt={n.title}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Readings;
