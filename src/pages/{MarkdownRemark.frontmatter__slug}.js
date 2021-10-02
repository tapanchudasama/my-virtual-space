import React from "react";
import { Heading, Container, Box, Stack } from "@chakra-ui/layout";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";

const ReadingInstance = ({ data }) => {
  const { markdownRemark } = data;
  return (
    <Layout>
      <Container maxWidth="6xl" height="100%">
        <Stack spacing={8} py={8}>
          <Heading>{markdownRemark.frontmatter.title}</Heading>
          <Box>
            <GatsbyImage
              style={{ borderRadius: "4px" }}
              image={getImage(markdownRemark.frontmatter.image)}
              alt={markdownRemark.title}
            />
          </Box>
          <Box fontSize={["sm", "md", "md"]}>
            <div
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            ></div>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
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
      html
    }
  }
`;
export default ReadingInstance;
