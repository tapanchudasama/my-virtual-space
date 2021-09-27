import React, { useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  Flex,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { borderVariants } from "../pages/navigation";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);
const MotionBox = motion(Box);

const HEADING = "some of my work";
const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letter = {
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

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const headingAnimation = useAnimation();
  const contentAnimation = useAnimation();
  const projectDescriptionBgColor = useColorModeValue("teal.200", "gray.700");
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const borderColor = useColorModeValue("green.800", "yellow.200");

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
            <MotionText
              key={char + "-" + index}
              pr={[2, 2, 4]}
              variants={letter}
            >
              {char}
            </MotionText>
          );
        })}
      </MotionHeading>
      <MotionStack
        initial="hidden"
        animate={contentAnimation}
        variants={letter}
        spacing={12}
        alignItems="stretch"
        justifyContent="space-evenly"
        flexWrap={true}
        direction={["column", "column", "row"]}
      >
        {allMarkdownRemark.nodes.map((n) => {
          return (
            <Stack
              boxShadow={boxShadow}
              spacing={2}
              alignItems="start"
              direction="column"
              borderRadius={4}
              backgroundColor={projectDescriptionBgColor}
            >
              <Box p={4}>
                <Heading fontSize={["xl", "2xl"]} pb={4}>
                  {n.frontmatter.title}
                </Heading>
                <VStack spacing={4}>
                  <Box>
                    <GatsbyImage
                      style={{ borderRadius: "4px" }}
                      image={getImage(n.frontmatter.cover_image)}
                      alt={n.title}
                    />
                  </Box>
                  <Box>
                    <Text fontSize={["sm", "md"]}>
                      <div dangerouslySetInnerHTML={{ __html: n.html }} />
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Stack>
          );
        })}
      </MotionStack>
      <Flex
        alignItems="center"
        justifyContent="center"
        pt={12}
        // display={allMarkdownRemark.nodes.length > 3 ? "flex" : "none"}
      >
        <MotionBox
          position="relative"
          initial="hidden"
          whileHover="visible"
          cursor="pointer"
        >
          <Stack
            direction="row"
            spacing={2}
            fontSize={["sm", "md"]}
            _hover={{ fontWeight: "bold" }}
            alignItems="center"
          >
            <Link to="/works">view my all works</Link>
          </Stack>
          <MotionBox
            borderBottom="1px"
            variants={borderVariants}
            borderColor={borderColor}
          />
        </MotionBox>
      </Flex>
    </Container>
  );
};

export default Projects;
