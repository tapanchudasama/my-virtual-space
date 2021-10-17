import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/layout";

const ReadingInstance = ({ data }) => {
  const { markdownRemark } = data;
  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-16 ">
        <div className="py-8 space-y-8">
          <h3>{markdownRemark.frontmatter.title}</h3>
          <div>
            <GatsbyImage
              style={{ borderRadius: "4px" }}
              image={getImage(markdownRemark.frontmatter.image)}
              alt={markdownRemark.title}
            />
          </div>
          <div className="text-sm mg:text-md" fontSize={["sm", "md", "md"]}>
            <div
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            ></div>
          </div>
        </div>
      </div>
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
