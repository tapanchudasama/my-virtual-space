import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import { letter, sentence } from "../components/about";
import SectionHeading from "../components/common/SectionHeading";
import Layout from "../components/layout";
import Seo from "../components/seo";

const MotionSectionHeading = motion(SectionHeading);

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
          <MotionSectionHeading
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
          </MotionSectionHeading>
          <div className="flex flex-col pb-8">
            {allHashNodePost.nodes.map((n) => {
              return (
                <div className="flex flex-col py-4 border-b border-white w-full items-start space-y-4">
                  <div className="flex items-center justify-between w-full">
                    <a
                      rel="noreferrer"
                      className="w-3/5"
                      href={`https://blog.tapan.app/${n.slug}`}
                      target="_blank"
                    >
                      <p className="text-sm lg:text-lg font-bold leading-tight hover:text-gray-500">
                        {n.title}
                      </p>
                    </a>
                    <p className="text-xs">
                      {new Date(n.dateAdded).toDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
                    <a
                      rel="noreferrer"
                      href={`https://blog.tapan.app/${n.slug}`}
                      target="_blank"
                    >
                      <div>
                        <GatsbyImage
                          style={{ borderRadius: "4px" }}
                          image={n.coverImage && getImage(n.coverImage)}
                          alt={n.title}
                        />
                      </div>
                    </a>
                    <div className="flex-1">
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
