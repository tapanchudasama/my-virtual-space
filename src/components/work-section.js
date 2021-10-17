import { motion, useAnimation } from "framer-motion";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { letter, sentence } from "./about";
import Project from "./common/project";
import SectionHeading from "./common/SectionHeading";
import { borderVariants } from "./navigation";

const MotionSectionHeading = motion(SectionHeading);

const HEADING = "some of my work";

const Projects = () => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
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

  useEffect(() => {
    async function sequence() {
      if (inView) {
        await headingAnimation.start("visible");
      }
    }
    sequence();
  }, [inView, headingAnimation]);

  const { allMarkdownRemark } = data;

  return (
    <div className="container px-4 lg:px-16 mx-auto mt-16" ref={ref}>
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
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        py={4}
        justifyItems="start"
        justifyContent="start"
      >
        {allMarkdownRemark.nodes.map((n) => {
          return <Project node={n} />;
        })}
      </div>
      <div className="flex items-center justify-center pt-10">
        <motion.div
          initial="hidden"
          whileHover="visible"
          className="cursor-pointer relative"
        >
          <p
            className="text-sm lg:text-md"
            _hover={{ fontWeight: "bold" }}
            alignItems="center"
          >
            <Link to="/works">view my all works</Link>
          </p>
          <motion.div
            className="border-b border-black"
            variants={borderVariants}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
