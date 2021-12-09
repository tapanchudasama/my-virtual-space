import { motion, useAnimation } from "framer-motion";
import { graphql, Link, useStaticQuery } from "gatsby";
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
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/writings/" } }
      ) {
        nodes {
          id
          frontmatter {
            title
            slug
            brief
            image {
              id
              childImageSharp {
                gatsbyImageData(
                  width: 300
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            dateAdded(formatString: "DD/MM/YY")
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

  const { allHashNodePost, allMarkdownRemark } = data;

  return (
    <div>
      <Layout>
        <div className="container mx-auto px-4 lg:px-16 font-oxygen">
          <Seo titleTemplate="%s · writings" />
          <motion.p
            className="text-3xl md:text-4xl lg:text-5xl py-6 flex space-x-2 leading-tight font-bold"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-16">
            {allMarkdownRemark.nodes.map((n) => {
              return (
                <div className="flex flex-col w-full items-start space-y-4 py-10">
                  <Link to={n.frontmatter.slug}>
                    <p className="text-lg lg:text-xl font-bold leading-tight hover:text-gray-300">
                      {n.frontmatter.title}
                    </p>
                  </Link>
                  <p className="text-md">
                    {new Date(n.frontmatter.dateAdded).toDateString()}
                  </p>
                  <div className="flex flex-col space-y-4">
                    <Link to={n.frontmatter.slug}>
                      <div className="mx-auto">
                        <GatsbyImage
                          style={{ borderRadius: "4px" }}
                          image={
                            n.frontmatter.image && getImage(n.frontmatter.image)
                          }
                          alt={n.frontmatter.title}
                        />
                      </div>
                    </Link>
                    <div className="w-full">
                      <p className="text-base lg:text-md">
                        {n.frontmatter.brief}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {allHashNodePost.nodes.map((n) => {
              return (
                <div className="flex flex-col w-full items-start space-y-4 py-10">
                  <a
                    rel="noreferrer"
                    href={`https://blog.tapan.app/${n.slug}`}
                    target="_blank"
                  >
                    <p className="text-lg lg:text-xl font-bold leading-tight hover:text-gray-300">
                      {n.title}
                    </p>
                  </a>
                  <p className="text-md">
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
                      <p className="text-base lg:text-md">{n.brief}</p>
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
