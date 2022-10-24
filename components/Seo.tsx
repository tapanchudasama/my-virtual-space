import Head from 'next/head'


const SEO = ({ titleTemplate }) => {
  const { siteMetadata } = useSiteMetadata();
  const { pathname } = useLocation();

  const { title, description, siteUrl, image, twitterUsername } = siteMetadata;

  const seo = {
    title: title,
    description: description,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={titleTemplate}
      htmlAttributes={{ lang: "en" }}
    >
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.title && <meta property="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.image && <meta property="twitter:image" content={seo.image} />}
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="og:image" content={seo.image} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      {seo.image && <meta name="twitter:card" content={seo.image} />}
    </Helmet>
  );
};

export default SEO;
