import { GetServerSideProps, GetStaticProps } from "next";
import React, { Fragment, useEffect } from "react";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";
import readingTime from "reading-time";

import Seo from "../components/Seo";
import Header from "../components/Header";
import Layout from "../components/Layout";
import PageViews from "../components/PageViews";

const HEADING = "reads";

const Reads = ({
  reads,
}: {
  reads: {
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
    <Layout slug="reads">
      <div className="min-h-screen bg-gray-800 text-white">
        <Header />
        <div className="container">
          <Seo titleTemplate="blog" />
          <p className="heading">{HEADING}</p>
          <div className="pt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-gray-400 text-md md:text-lg">
                updated on {reads.frontmatter.lastUpdated}
              </p>
              <p className="bg-gray-400 w-1 h-1 rounded-full"></p>
              <p className="text-gray-400 text-md md:text-lg">
                added on {reads.frontmatter.dateAdded}
              </p>
            </div>
          </div>
          <p className="sub-heading">
            all the things which i feel are good, intellectually stimulating
            reads will be dumped here. they can be from newsletter articles,
            essays or even comment on reddit.
          </p>
          <div className="prose sm:prose-sm lg:prose-lg py-8">
            <div dangerouslySetInnerHTML={{ __html: reads.html }}></div>
          </div>
        </div>
        <PageViews slug="reads" />
      </div>
    </Layout>
  );
};

export default Reads;

export const getStaticProps: GetStaticProps = async () => {
  const dir = path.join(process.cwd(), "content/reads/links.md");

  const fileContents = matter(await fs.readFile(dir, "utf8"));

  // Generally you would parse/transform the contents
  // For example you can transform markdown to HTML here

  const markdown = await remark()
    .use(html)
    .process(fileContents.content || "");

  return {
    props: {
      reads: {
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
