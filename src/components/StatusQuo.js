import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { letter, sentence } from "../components/about";
import SectionHeading from "../components/common/SectionHeading";

const MotionSectionHeading = motion(SectionHeading);

const HEADING = "status quo";

const StatusQuo = () => {
  const data = useStaticQuery(graphql`
    query StatusQuoQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/sections/status-quo/" } }
      ) {
        nodes {
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
  const { html } = allMarkdownRemark.nodes[0];

  return (
    <div className="container px-4 lg:px-16 mx-auto" ref={ref}>
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
      <div className="text-md lg:text-lg">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </div>
  );
};

export default StatusQuo;
