import { GetServerSideProps } from "next";
import React, { Fragment, useEffect } from "react";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";
import readingTime from "reading-time";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";

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
    <div className="min-h-screen bg-gray-800 text-white font-merriweather">
      <div className="h-screen bg-gray-800 text-white font-merriweather">
        <Header />
        <div className="container pt-28">
          <Seo titleTemplate="blog" />
          <div className="py-6 space-y-2">
            <p className="text-3xl md:text-4xl lg:text-5xl flex space-x-2 leading-tight font-bold">
              {HEADING}
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-md text-gray-400">
                {reads.frontmatter.dateAdded}
              </p>
              <p className="bg-gray-400 w-1 h-1 rounded-full"></p>
              <p className="text-md text-gray-400">
                {reads.frontmatter.lastUpdated}
              </p>
            </div>
          </div>
          <p className="text-md lg:text-lg">
            all the things which i feel are good, intellectually stimulating
            reads will be dumped here. they can be from newsletter articles,
            essays or even comment on reddit.
          </p>
          <div className="prose sm:prose-sm lg:prose-lg">
            <div dangerouslySetInnerHTML={{ __html: reads.html }}></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reads;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
