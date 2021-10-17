import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/layout";
import { motion, useAnimation } from "framer-motion";
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import { letter, sentence } from "../components/about";
import SectionHeading from "../components/common/SectionHeading";
import Layout from "../components/layout";
import Seo from "../components/seo";

const MotionSectionHeading = motion(SectionHeading);
const MotionText = motion(Text);

const HEADING = "readings";

const Readings = () => {
  const data = useStaticQuery(graphql`
    query ReadingsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/readings/" } }
      ) {
        nodes {
          id
          frontmatter {
            title
            tags
            slug
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 150
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
  const value = useColorModeValue();
  const hoverColor = useColorModeValue("blue.800", "whiteAlpha.600");
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
  console.log(allMarkdownRemark);
  return (
    <Box backgroundColor={value}>
      <Layout>
        <Container maxWidth="6xl">
          <Seo titleTemplate="%s · readings" />
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
          <Stack direction="row" pb={8} spacing={0}>
            {allMarkdownRemark.nodes.map((n) => {
              return (
                <Link to={`${n.frontmatter.slug}`}>
                  <Stack
                    borderRadius={8}
                    direction="column"
                    p={2}
                    alignItems="start"
                  >
                    <Heading
                      fontSize={["md", "lg"]}
                      cursor="pointer"
                      _hover={{ textColor: hoverColor }}
                    >
                      {n.frontmatter.title}
                    </Heading>
                    <Stack
                      direction="column"
                      alignItems={["center", "center", "inherit"]}
                      spacing={4}
                    >
                      <Box>
                        <GatsbyImage
                          style={{ borderRadius: "4px" }}
                          image={getImage(n.frontmatter.image)}
                          alt={n.title}
                        />
                      </Box>
                    </Stack>
                  </Stack>
                </Link>
              );
            })}
          </Stack>
        </Container>
      </Layout>
    </Box>
  );
};

export default Readings;
