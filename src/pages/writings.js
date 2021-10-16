import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import { letter, sentence } from "../components/about";
import SectionHeading from "../components/common/SectionHeading";
import Layout from "../components/layout";
import Seo from "../components/seo";

const MotionSectionHeading = motion(SectionHeading);
const MotionText = motion(Text);

const HEADING = "writings";

const Writings = () => {
  const data = useStaticQuery(graphql`
    query WritingsQuery {
      allHashNodePost {
        nodes {
          brief
          title
          slug
          cuid
          dateAdded
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

  const { allHashNodePost } = data;

  return (
    <Box backgroundColor={value}>
      <Layout>
        <Container maxWidth="6xl">
          <Seo titleTemplate="%s · writings" />
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
          <Stack direction="column" pb={8} spacing={0}>
            {allHashNodePost.nodes.map((n) => {
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
                    <Link
                      href={`https://blog.tapan.app/${n.slug}`}
                      target="_blank"
                      width="70%"
                    >
                      <Heading
                        fontSize={["sm", "md"]}
                        _hover={{ textColor: hoverColor }}
                      >
                        {n.title}
                      </Heading>
                    </Link>
                    <Text fontSize={["xs"]}>
                      {new Date(n.dateAdded).toDateString()}
                    </Text>
                  </Flex>
                  <Stack
                    direction={["column", "column", "row"]}
                    alignItems={["center", "center", "inherit"]}
                    spacing={4}
                  >
                    <Link
                      href={`https://blog.tapan.app/${n.slug}`}
                      target="_blank"
                    >
                      <Box>
                        <GatsbyImage
                          style={{ borderRadius: "4px" }}
                          image={n.coverImage && getImage(n.coverImage)}
                          alt={n.title}
                        />
                      </Box>
                    </Link>
                    <Box flexGrow={1}>
                      <Text fontSize={["xs", "sm"]}>{n.brief}</Text>
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
