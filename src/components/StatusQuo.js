import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Flex, Box, Container, Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

import SectionHeading from "../components/common/SectionHeading";
import { sentence, letter } from "../components/about";

const MotionSectionHeading = motion(SectionHeading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

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
  const contentAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      if (inView) {
        await headingAnimation.start("visible");
        await contentAnimation.start("visible");
      }
    }
    sequence();
  }, [inView, contentAnimation, headingAnimation]);

  const { allMarkdownRemark } = data;
  const { html } = allMarkdownRemark.nodes[0];

  return (
    <Container maxWidth="6xl" ref={ref} py={8}>
      <MotionSectionHeading
        initial="hidden"
        display="flex"
        variants={sentence}
        animate={headingAnimation}
        fontSize={["3xl", "4xl", "5xl"]}
      >
        {HEADING.split(" ").map((char, index) => {
          return (
            <MotionText key={char + "-" + index} pr="4" variants={letter}>
              {char}
            </MotionText>
          );
        })}
      </MotionSectionHeading>
      <MotionBox initial="hidden" variants={letter} animate={contentAnimation}>
        <MotionFlex
          initial="hidden"
          variants={letter}
          animate={contentAnimation}
          direction="column"
        >
          <Box fontSize={["md", "lg"]}>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </Box>
        </MotionFlex>
      </MotionBox>
    </Container>
  );
};

export default StatusQuo;
