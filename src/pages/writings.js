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
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { letter, sentence } from "../components/about";
import Layout from "../components/layout";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HEADING = "writings";

const Writings = () => {
  const data = useStaticQuery(graphql`
    query WritingsQuery {
      allHashnodePost {
        nodes {
          brief
          title
          slug
          cuid
          dateAdded(formatString: "DD/MMM/YYYY")
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
    }
  `);
  const value = useColorModeValue();
  const hoverColor = useColorModeValue("blue.800", "whiteAlpha.600");
  const headingAnimation = useAnimation();
  const contentAnimation = useAnimation();

  const projectDescriptionBgColor = useColorModeValue(
    "blackAlpha.300",
    "whiteAlpha.300"
  );

  useEffect(() => {
    async function sequence() {
      await headingAnimation.start("visible");
      await contentAnimation.start("visible");
    }
    sequence();
  }, [contentAnimation, headingAnimation]);

  const { allHashnodePost } = data;

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
          <Stack direction="column" pb={8} spacing={0}>
            {allHashnodePost.nodes.map((n) => {
              return (
                <Stack
                  borderBottomColor={projectDescriptionBgColor}
                  borderBottomWidth="1px"
                  p={4}
                  width="100%"
                  alignItems="start"
                  direction="column"
                >
                  <Flex
                    alignItems="baseline"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <a
                      href={`https://blog.tapan.app/${n.slug}`}
                      target="_blank"
                    >
                      <Heading
                        fontSize={["md", "lg"]}
                        _hover={{ textColor: hoverColor }}
                      >
                        {n.title}
                      </Heading>
                    </a>
                    <Text fontSize={["xs"]}>{n.dateAdded}</Text>
                  </Flex>
                  <Stack
                    direction={["column", "column", "row"]}
                    alignItems={["center", "center", "inherit"]}
                    spacing={4}
                  >
                    <a
                      href={`https://blog.tapan.app/${n.slug}`}
                      target="_blank"
                    >
                      <Box>
                        <GatsbyImage
                          style={{ borderRadius: "4px" }}
                          image={getImage(n.coverImage)}
                          alt={n.title}
                        />
                      </Box>
                    </a>
                    <Box flexGrow={1}>
                      <Text fontSize={["sm"]}>{n.brief}</Text>
                    </Box>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Container>
      </Layout>
    </Box>
  );
};

export default Writings;
