import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  Flex,
  Box,
  Container,
  Text,
  Stack,
  Link,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import {
  FaHeadphones,
  FaStarOfLife,
  FaNetworkWired,
  FaLightbulb,
} from "react-icons/fa";

import SpotifyRecentlyPlayed from "./spotify-recently-played";
import SectionHeading from "../components/common/SectionHeading";

const MotionSectionHeading = motion(SectionHeading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

const HEADING = "some things about me";

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
            mbti_type
            hobbies
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
  const { frontmatter } = allMarkdownRemark.nodes[0];
  const image = getImage(frontmatter.about_image);

  return (
    <Container maxWidth="6xl" ref={ref}>
      <MotionSectionHeading
        initial="hidden"
        display="flex"
        variants={sentence}
        animate={headingAnimation}
        py={8}
      >
        {HEADING.split(" ").map((char, index) => {
          return (
            <MotionText key={char + "-" + index} pr="4" variants={letter}>
              {char}
            </MotionText>
          );
        })}
      </MotionSectionHeading>
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
          <Grid
            templateColumns={[
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(3,1fr)",
            ]}
            justifyItems="center"
            justifyContent="center"
            gap={8}
            fontSize={["sm", "md"]}
            pt="8"
          >
            <GridItem>
              <Stack
                direction="column"
                alignItems="center"
                width="100%"
                justifyContent="stretch"
                textAlign="center"
              >
                <Icon as={FaStarOfLife} w={8} h={8} />
                <Text>
                  I enjoy{" "}
                  {frontmatter.hobbies.map((h, index) => {
                    return (
                      <Text display="inline" fontWeight="bold">
                        {h}
                        {index === frontmatter.hobbies.length - 1
                          ? ""
                          : ","}{" "}
                      </Text>
                    );
                  })}
                  . Doing a Europe tour is one of the items in my bucket list.
                </Text>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack
                direction="column"
                alignItems="center"
                width="100%"
                justifyContent="center"
              >
                <Icon as={FaNetworkWired} w={8} h={8} />
                <Text textAlign="center">
                  My{" "}
                  <Link
                    fontWeight="bold"
                    href="https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator"
                  >
                    Myers-Briggs Type Indicator (MBTI)
                  </Link>{" "}
                  is{" "}
                  <Link
                    fontWeight="bold"
                    href="https://www.16personalities.com/intj-personality?utm_source=email&utm_medium=welcome-architect&utm_campaign=description"
                  >
                    {frontmatter.mbti_type}.
                  </Link>{" "}
                  (introverted, intuitive, thinking, and judging)
                  <Text>
                    You also can take the test yourself at{" "}
                    <Link
                      fontWeight="bold"
                      href="http://www.16personalities.com/"
                    >
                      16personalities.com
                    </Link>
                  </Text>
                </Text>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack
                direction="column"
                alignItems="center"
                width="100%"
                justifyContent="center"
              >
                <Icon as={FaHeadphones} w={8} h={8} />
                <Text textAlign="center">Currently I am listening to:</Text>
                <SpotifyRecentlyPlayed />
              </Stack>
            </GridItem>
            <GridItem>
              <Stack
                direction="column"
                alignItems="center"
                width="100%"
                justifyContent="center"
              >
                <Icon as={FaLightbulb} w={8} h={8} />
                <Text textAlign="center">
                  I enjoy talking about intellectually stimulating topics, be it
                  any field. Currently I am trying to learn about{" "}
                  <strong>stock markets</strong> and <strong>finance</strong>{" "}
                  along with software engineering, of course.
                </Text>
              </Stack>
            </GridItem>
          </Grid>
        </MotionFlex>
      </MotionBox>
    </Container>
  );
};

export default About;
