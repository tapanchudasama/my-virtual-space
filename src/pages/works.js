import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import { letter, sentence } from "../components/about";
import Project from "../components/common/project";
import Layout from "../components/layout";
import Seo from "../components/seo";

const HEADING = "all my works";

const Works = () => {
  const data = useStaticQuery(graphql`
    query AllProjectsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            title
            featured
            date
            demo_link
            repo_link_backend
            repo_link_frontend
            techs
          }
          html
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
    <Layout>
      <div className="container mx-auto px-4 lg:px-16 font-ibm-plex-sans">
        <Seo titleTemplate="%s · works" />
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl py-6 flex space-x-2 leading-tight font-bold"
          initial="hidden"
          display="flex"
          variants={sentence}
          animate={headingAnimation}
          fontSize={["3xl", "4xl", "5xl"]}
        >
          {HEADING.split(" ").map((char, index) => {
            return (
              <motion.p key={char + "-" + index} variants={letter}>
                {char}
              </motion.p>
            );
          })}
        </motion.p>
        <div className="grid grid-cols-1 lg:grid-cols-2 pb-16 gap-16">
          {allMarkdownRemark.nodes.map((n) => {
            return <Project node={n} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Works;
