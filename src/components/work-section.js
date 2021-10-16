import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { motion, useAnimation } from "framer-motion";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { letter, sentence } from "./about";
import Project from "./common/project";
import SectionHeading from "./common/SectionHeading";
import { borderVariants } from "./navigation";

const MotionSectionHeading = motion(SectionHeading);
const MotionText = motion(Text);
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

  const borderColor = useColorModeValue("blue.200", "yellow.200");

  useEffect(() => {
    async function sequence() {
      if (inView) {
        await headingAnimation.start("visible");
      }
    }
    sequence();
  }, [inView, headingAnimation]);

  const { allMarkdownRemark } = data;

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
      <Grid
        py={4}
        templateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)"]}
        justifyItems="start"
        justifyContent="start"
        gap={16}
        spacing={12}
      >
        {allMarkdownRemark.nodes.map((n) => {
          return (
            <GridItem>
              <Project node={n} />
            </GridItem>
          );
        })}
      </Grid>
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
