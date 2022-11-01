import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";
import readingTime from "reading-time";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";

const HEADING = "blog";

const Writings = ({
  hashnodePosts,
  localPosts,
}: {
  hashnodePosts: {
    success: boolean;
    posts: {
      _id: string;
      title: string;
      brief: string;
      coverImage: string;
      slug: string;
      dateAdded: string;
      readingTime: { text: string };
    }[];
  };
  localPosts: {
    frontmatter: {
      _id: string;
      title: string;
      brief: string;
      coverImage: string;
      slug: string;
      dateAdded: string;
    };
    readingTime: { text: string };
    html: string;
  }[];
}) => {
  return (
    <div className="bg-gray-800 text-white font-merriweather">
      <Header />
      <div className="container pt-28">
        <Seo titleTemplate="blog" />
        <p className="text-3xl md:text-4xl lg:text-5xl py-6 flex space-x-2 leading-tight font-bold">
          {HEADING}
        </p>
        <p className="text-md lg:text-lg">
          all the things that i have written till now and will write in future
          will be visible here.
        </p>
        <div className="flex flex-col space-y-12 py-16">
          {localPosts.map((post) => {
            return (
              <div key={post.frontmatter._id} className="flex flex-col">
                <a rel="noreferrer" href={`blog/${post.frontmatter.slug}`}>
                  <p className="text-lg lg:text-xl font-bold leading-tight hover:text-blue-300">
                    {post.frontmatter.title}
                  </p>
                </a>
                <div className="flex items-center mt-2 space-x-2">
                  <p className="text-md text-gray-400">
                    {post.frontmatter.dateAdded}
                  </p>
                  <p className="bg-gray-400 w-1 h-1 rounded-full"></p>
                  <p className="text-md text-gray-400">
                    {post.readingTime.text}
                  </p>
                </div>
                <div className="flex flex-col mt-4">
                  <div className="w-full">
                    <p className="text-base lg:text-md">
                      {post.frontmatter.brief}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {hashnodePosts.posts.map((post) => {
            return (
              <div key={post._id} className="flex flex-col">
                <a
                  rel="noreferrer"
                  href={`https://blog.tapan.app/${post.slug}`}
                  target="_blank"
                >
                  <p className="text-lg lg:text-xl font-bold leading-tight hover:text-blue-300">
                    {post.title}
                  </p>
                </a>
                <div className="flex items-center mt-2 space-x-2">
                  <p className="text-md text-gray-400">{post.dateAdded}</p>
                  <p className="bg-gray-400 w-1 h-1 rounded-full"></p>
                  <p className="text-md text-gray-400">
                    {post.readingTime.text}
                  </p>
                </div>
                <p className="text-base lg:text-md mt-4">{post.brief}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Writings;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int) {
      user(username: "inflame") {
        publication {
          posts(page: $page) {
            title
            brief
            slug
            coverImage
            dateAdded
            contentMarkdown
          }
        }
      }
    }`;

  const postsData = await hashnodeGql(GET_USER_ARTICLES)
    .then((result) => {
      const posts = result.data.user.publication.posts.map((p: any) => ({
        ...p,
        dateAdded: new Date(p.dateAdded).toLocaleDateString(),
        readingTime: readingTime(p.contentMarkdown.toString()),
      }));

      return {
        success: true,
        posts,
      };
    })
    .catch(() => ({ success: false, posts: [] }));

  const writingsDir = path.join(process.cwd(), "content/blog");
  const writingsData = await fs.readdir(writingsDir);

  const blogs = writingsData.map(async (filename) => {
    const filePath = path.join(writingsDir, filename);
    const fileContents = matter(await fs.readFile(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    const markdown = await remark()
      .use(html)
      .process(fileContents.content || "");

    return {
      frontmatter: {
        ...fileContents.data,
        dateAdded: new Date(fileContents.data.dateAdded).toLocaleDateString(),
      },
      html: markdown.toString(),
      readingTime: readingTime(markdown.toString()),
    };
  });

  return {
    props: {
      hashnodePosts: await postsData,
      localPosts: await Promise.all(blogs),
    },
  };
};

async function hashnodeGql(query: string, variables = {}) {
  const data = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return data.json();
}
