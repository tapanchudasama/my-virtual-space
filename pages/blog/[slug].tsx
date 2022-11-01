import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { NextPage } from "next";
import readingTime from "reading-time";
import Header from "../../components/Header";
import Image from "next/image";
import Footer from "../../components/Footer";

type Post = {
  frontmatter: {
    title: string;
    dateAdded: string;
    coverImage: string;
  };
  readingTime: { text: string };
  markdown: string;
};

const Post: NextPage<Post> = ({ markdown, frontmatter, readingTime }) => {
  return (
    <div className="bg-gray-800 text-white font-merriweather h-full">
      <Header />
      <div className="container pt-28 lg:px-64">
        <div className="py-6 space-y-2">
          <p className="flex text-3xl xl:text-4xl flex space-x-2 leading-tight font-bold">
            {frontmatter.title}
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-md text-gray-400">{frontmatter.dateAdded}</p>
            <p className="bg-gray-400 w-1 h-1 rounded-full"></p>
            <p className="text-md text-gray-400">{readingTime.text}</p>
          </div>
        </div>
        <Image
          src={"/" + frontmatter.coverImage}
          alt="Image of Manali"
          layout="responsive"
          width={500}
          height={300}
        />
        <div className="prose sm:prose-sm lg:prose-lg">
          <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;

export const getStaticPaths = async (): Promise<{
  paths: { params: { slug: string } }[];
  fallback: boolean;
}> => {
  const dir = path.join(process.cwd(), "content/blog");
  const files = await fs.readdir(dir);
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { data: frontmatter, content } = matter(
    await fs.readFile(
      path.join(process.cwd(), "content/blog", slug + ".md"),
      "utf8"
    )
  );

  const markdown = await remark()
    .use(html)
    .process(content || "");

  return {
    props: {
      frontmatter: {
        ...frontmatter,
        dateAdded: new Date(frontmatter.dateAdded).toLocaleDateString(),
      },
      slug,
      markdown: markdown.toString(),
      readingTime: readingTime(markdown.toString()),
    },
  };
};
