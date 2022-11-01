import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { NextPage } from "next";
import Header from "../../components/Header";
import Image from "next/image";
import Footer from "../../components/Footer";

type Post = {
  frontmatter: {
    title: string;
    dateAdded: string;
    coverImage: string;
  };
  markdown: string;
};

const Post: NextPage<Post> = ({ markdown, frontmatter }) => {
  return (
    <div className="bg-gray-800 text-white font-oxygen h-full">
      <Header />
      <div className="container pt-28 lg:px-64">
        <p className="font-bold text-md">{frontmatter.dateAdded}</p>
        <p className="flex text-3xl xl:text-4xl py-6 flex space-x-2 leading-tight font-bold">
          {frontmatter.title}
        </p>
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
  const dir = path.join(process.cwd(), "content/writings");
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
      path.join(process.cwd(), "content/writings", slug + ".md"),
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
    },
  };
};
