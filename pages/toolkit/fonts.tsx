import { GetServerSideProps, GetStaticProps } from "next";
import React, { Fragment, useEffect } from "react";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";
import readingTime from "reading-time";

import Seo from "../../components/Seo";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import PageViews from "../../components/PageViews";

const HEADING = "fonts";

const Fonts = ({
  toolkit,
}: {
  toolkit: {
    frontmatter: {
      _id: string;
      title: string;
      brief: string;
      coverImage: string;
      slug: string;
      dateAdded: string;
      lastUpdated: string;
    };
    html: string;
  };
}) => {
  return (
    <Layout slug="toolkit">
      <div className="min-h-screen bg-gray-800 text-white">
        <Header />
        <div className="container">
          <Seo titleTemplate="setup" />
          <p className="heading">{HEADING}</p>
          <div className="pt-2 space-y-2">
            <div className="flex flex-wrap items-center space-x-2">
              <p className="text-gray-400 text-md md:text-lg">
                updated on {toolkit.frontmatter.lastUpdated}
              </p>
              <p className="bg-gray-400 w-1 h-1 rounded-full"></p>
              <p className="text-gray-400 text-md md:text-lg">
                added on {toolkit.frontmatter.dateAdded}
              </p>
            </div>
          </div>
          <div className="prose sm:prose-sm lg:prose-lg py-8">
            <div dangerouslySetInnerHTML={{ __html: toolkit.html }}></div>
          </div>
        </div>
        <PageViews slug="toolkit" />
      </div>
    </Layout>
  );
};

export default Fonts;

export const getStaticProps: GetStaticProps = async () => {
  const dir = path.join(process.cwd(), "content/toolkit/fonts.md");

  const fileContents = matter(await fs.readFile(dir, "utf8"));

  // Generally you would parse/transform the contents
  // For example you can transform markdown to HTML here

  const markdown = await remark()
    .use(html)
    .process(fileContents.content || "");

  return {
    props: {
      toolkit: {
        frontmatter: {
          ...fileContents.data,
          dateAdded: new Date(fileContents.data.dateAdded).toLocaleDateString(),
          lastUpdated: new Date(
            fileContents.data.lastUpdated
          ).toLocaleDateString(),
        },
        html: markdown.toString(),
        readingTime: readingTime(markdown.toString()),
      },
    },
  };
};
