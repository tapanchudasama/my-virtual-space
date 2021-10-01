import React, { useEffect } from "react";
import {
  Text,
  Box,
  Flex,
  Container,
  Heading,
  Grid,
  GridItem,
  Link as ChakraLink,
  Stack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { motion, useAnimation } from "framer-motion";
import { useStaticQuery, graphql } from "gatsby";

import { letter, sentence } from "../components/about";
import Layout from "../components/layout";
import Project from "../components/common/project";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

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
            cover_image {
              childImageSharp {
                gatsbyImageData(
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
  const value = useColorModeValue("gray.100");

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
    <Box backgroundColor={value}>
      <Layout>
        <Container maxWidth="6xl">
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
          <Grid pb={8} templateColumns="repeat(3, 1fr)" gap={4}>
            {allMarkdownRemark.nodes.map((n) => {
              return (
                <GridItem>
                  <Project node={n} />
                </GridItem>
              );
            })}
          </Grid>
        </Container>
      </Layout>
    </Box>
  );
};

export default Works;
