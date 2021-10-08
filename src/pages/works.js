import { Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import { letter, sentence } from "../components/about";
import Project from "../components/common/project";
import Layout from "../components/layout";
import Seo from "../components/seo";

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
    <Layout>
      <Container maxWidth="6xl">
        <Seo titleTemplate="%s · works" />
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
        <Grid
          pb={16}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap={16}
        >
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
  );
};

export default Works;
