import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import Layout from "../components/layout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Seo from "../components/Seo";

const HEADING = "writings";

const Writings = ({
  success,
  posts,
}: {
  success: boolean;
  posts: {
    _id: string;
    title: string;
    brief: string;
    coverImage: string;
    slug: string;
    dateAdded: string;
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
          {posts.map((post) => {
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

  const postsData = hashnodeGql(GET_USER_ARTICLES)
    .then((result) => ({
      success: true,
      posts: result.data.user.publication.posts,
    }))
    .catch(() => ({ success: false, posts: [] }));

  return {
    props: postsData,
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
