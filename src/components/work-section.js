import React, { useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Flex, Box, Container, Text, Stack } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/color-mode";

import { borderVariants } from "./navigation";
import Project from "./common/project";
import SectionHeading from "./common/SectionHeading";
import { letter, sentence } from "./about";

const MotionSectionHeading = motion(SectionHeading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);
const MotionBox = motion(Box);

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

  const borderColor = useColorModeValue("blue.200", "yellow.200");

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
      <MotionSectionHeading
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
      </MotionSectionHeading>
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
          return <Project node={n} />;
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
