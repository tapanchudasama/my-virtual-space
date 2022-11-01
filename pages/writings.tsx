import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";

const HEADING = "writings";

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
    html: string;
  }[];
}) => {
  const myLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className="bg-gray-800 text-white font-oxygen">
      <Header />
      <div className="container pt-28">
        <Seo titleTemplate="writings" />
        <p className="text-3xl md:text-4xl lg:text-5xl py-6 flex space-x-2 leading-tight font-bold">
          {HEADING}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-16">
          {localPosts.map((post) => {
            return (
              <div
                key={post.frontmatter._id}
                className="flex flex-col w-full items-start space-y-4"
              >
                <a rel="noreferrer" href={`writings/${post.frontmatter.slug}`}>
                  <p className="text-lg lg:text-xl font-bold leading-tight hover:text-blue-300">
                    {post.frontmatter.title}
                  </p>
                </a>
                <p className="text-md">
                  {new Date(post.frontmatter.dateAdded).toDateString()}
                </p>
                <div className="flex flex-col space-y-4">
                  <a
                    rel="noreferrer"
                    href={`writings/${post.frontmatter.slug}`}
                  >
                    <div className="mx-auto relative w-80 h-64">
                      <Image
                        layout="fill"
                        objectFit="contain"
                        loader={myLoader}
                        style={{ borderRadius: "4px" }}
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                      />
                    </div>
                  </a>
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
              <div
                key={post._id}
                className="flex flex-col w-full items-start space-y-4"
              >
                <a
                  rel="noreferrer"
                  href={`https://blog.tapan.app/${post.slug}`}
                  target="_blank"
                >
                  <p className="text-lg lg:text-xl font-bold leading-tight hover:text-blue-300">
                    {post.title}
                  </p>
                </a>
                <p className="text-md">
                  {new Date(post.dateAdded).toDateString()}
                </p>
                <div className="flex flex-col space-y-4">
                  <a
                    rel="noreferrer"
                    href={`https://blog.tapan.app/${post.slug}`}
                    target="_blank"
                  >
                    <div className="mx-auto relative w-80 h-48">
                      <Image
                        layout="fill"
                        objectFit="contain"
                        loader={myLoader}
                        style={{ borderRadius: "4px" }}
                        src={post.coverImage}
                        alt={post.title}
                      />
                    </div>
                  </a>
                  <div className="w-full">
                    <p className="text-base lg:text-md">{post.brief}</p>
                  </div>
                </div>
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
          }
        }
      }
    }`;

  const postsData = await hashnodeGql(GET_USER_ARTICLES)
    .then((result) => ({
      success: true,
      posts: result.data.user.publication.posts,
    }))
    .catch(() => ({ success: false, posts: [] }));

  const writingsDir = path.join(process.cwd(), "content/writings");
  const writingsData = await fs.readdir(writingsDir);

  const writings = writingsData.map(async (filename) => {
    const filePath = path.join(writingsDir, filename);
    const fileContents = matter(await fs.readFile(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    const markdown = await remark()
      .use(html)
      .process(fileContents.content || "");

    console.log(fileContents);
    return {
      frontmatter: fileContents.data,
      html: markdown.toString(),
    };
  });

  return {
    props: {
      hashnodePosts: await postsData,
      localPosts: await Promise.all(writings),
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
