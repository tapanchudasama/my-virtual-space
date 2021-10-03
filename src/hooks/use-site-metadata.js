import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaDataQuery {
        site {
          siteMetadata {
            title
            siteUrl
            name
            description
            image
            twitterUsername
          }
        }
      }
    `
  );
  return site;
};
