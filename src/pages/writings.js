import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import { letter, sentence } from "../components/about";
import Layout from "../components/layout";
import Seo from "../components/seo";

const HEADING = "writings";

const Writings = () => {
  const data = useStaticQuery(graphql`
    query WritingsQuery {
      allHashNodePost {
        nodes {
          brief
          title
          slug
          cuid
          dateAdded
          coverImage {
            childImageSharp {
              gatsbyImageData(
                width: 300
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
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

  const { allHashNodePost } = data;

  return (
    <div>
      <Layout>
        <div className="container mx-auto px-4 lg:px-16">
          <Seo titleTemplate="%s · writings" />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 pb-16">
            {allHashNodePost.nodes.map((n) => {
              return (
                <div className="flex flex-col w-full items-start space-y-4 py-2">
                  <a
                    rel="noreferrer"
                    href={`https://blog.tapan.app/${n.slug}`}
                    target="_blank"
                  >
                    <p className="text-sm lg:text-lg font-bold leading-tight hover:text-gray-300">
                      {n.title}
                    </p>
                  </a>
                  <p className="text-xs">
                    {new Date(n.dateAdded).toDateString()}
                  </p>
                  <div className="flex flex-col space-y-4">
                    <a
                      rel="noreferrer"
                      href={`https://blog.tapan.app/${n.slug}`}
                      target="_blank"
                    >
                      <div className="mx-auto">
                        <GatsbyImage
                          style={{ borderRadius: "4px" }}
                          image={n.coverImage && getImage(n.coverImage)}
                          alt={n.title}
                        />
                      </div>
                    </a>
                    <div className="w-full">
                      <p className="text-xs lg:text-sm">{n.brief}</p>
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

export default Writings;
