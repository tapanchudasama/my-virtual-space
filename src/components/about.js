import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Flex, Box, Container, Heading, Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

import SpotifyRecentlyPlayed from "./spotify-recently-played";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

const HEADING = "about me";

export const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      damping: 5,
      duration: 0.5,
    },
  },
};

const About = () => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/sections/about/" } }
      ) {
        nodes {
          frontmatter {
            about_image {
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
  const { frontmatter, html } = allMarkdownRemark.nodes[0];
  const image = getImage(frontmatter.about_image);

  return (
    <Container maxWidth="6xl" ref={ref}>
      <MotionHeading
        initial="hidden"
        display="flex"
        variants={sentence}
        animate={headingAnimation}
        fontSize={["3xl", "4xl", "5xl"]}
        py={8}
      >
        {HEADING.split(" ").map((char, index) => {
          return (
            <MotionText key={char + "-" + index} pr="4" variants={letter}>
              {char}
            </MotionText>
          );
        })}
      </MotionHeading>
      <MotionBox
        initial="hidden"
        variants={letter}
        animate={contentAnimation}
        py="4"
      >
        <MotionFlex
          initial="hidden"
          variants={letter}
          animate={contentAnimation}
          py="4"
          direction="column"
        >
          <Box alignSelf="center" w={[170, 250, 300]}>
            <GatsbyImage
              image={image}
              style={{ borderRadius: "50%" }}
              alt="my-picture"
            />
          </Box>
          <Box fontSize={["md", "lg", "xl"]} pt="8">
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </Box>
        </MotionFlex>
        <Heading fontSize={["xl", "2xl"]} py="2">
          what i am listening recently
        </Heading>
        <SpotifyRecentlyPlayed />
      </MotionBox>
    </Container>
  );
};

export default About;
