import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaDataQuery {
        site {
          siteMetadata {
            siteUrl
            name
            description
            socialMedia {
              twitter
              reddit
              linkedin
              github
              mail
            }
          }
        }
      }
    `
  );
  return site;
};
