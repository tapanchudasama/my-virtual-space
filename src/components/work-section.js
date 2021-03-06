import { motion, useAnimation } from "framer-motion";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { letter, sentence } from "./about";
import Project from "./common/project";

const HEADING = "some of my work";

export const borderVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const Works = () => {
  const data = useStaticQuery(graphql`
    query WorksQuery {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/works/" }
          frontmatter: { featured: { eq: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
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

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const headingAnimation = useAnimation();
  const contentAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      if (inView) {
        await headingAnimation.start("visible");
        await contentAnimation.start("visible");
      }
    }
    sequence();
  }, [inView, headingAnimation, contentAnimation]);

  const { allMarkdownRemark } = data;

  return (
    <div className="container px-4 lg:px-16 mx-auto mt-16" ref={ref}>
      <motion.p
        className="text-3xl xl:text-4xl py-6 flex space-x-2 leading-tight font-bold"
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
      <motion.div
        initial="hidden"
        animate={contentAnimation}
        variants={letter}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-4"
        justifyItems="start"
        justifyContent="start"
      >
        {allMarkdownRemark.nodes.map((n) => {
          return <Project node={n} />;
        })}
      </motion.div>
      <div className="flex items-center justify-center pt-16">
        <motion.div
          initial="hidden"
          whileHover="visible"
          className="cursor-pointer relative"
        >
          <p className="text-lg lg:text-xl hover:font-bold">
            <Link to="/works">view my all works</Link>
          </p>
          <motion.div
            className="border-b border-yellow-500"
            variants={borderVariants}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Works;
