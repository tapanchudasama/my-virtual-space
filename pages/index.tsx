import { promises as fs } from "fs";
import type { GetStaticProps, NextPage } from "next";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Seo from "../components/Seo";
import Hero from "../components/Hero";
import About from "../components/About";
import Employment from "../components/Work";
import Contact from "../components/Contact";

type Props = {
  aboutProps: {
    html: string;
  };
  employmentDataProps: {
    html: string;
  };
};

const Home: NextPage<Props> = ({ aboutProps, employmentDataProps }) => {
  return (
    <div className="overflow-hidden bg-gray-800 text-white font-serif">
      <Seo titleTemplate="home" />
      <Hero />
      <div className="container space-y-16 py-16">
        <About {...aboutProps} />
        <Employment {...employmentDataProps} />
        <Contact />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const statusQuo = matter(
    await fs.readFile(path.join(process.cwd(), "content", "about.md"), "utf-8")
  );

  const statusQuoMarkdown = await remark()
    .use(html)
    .process(statusQuo.content || "");

  const employmentData = matter(
    await fs.readFile(path.join(process.cwd(), "content", "work.md"), "utf-8")
  );

  const employmentMarkdown = await remark()
    .use(html)
    .process(employmentData.content || "");

  return {
    props: {
      aboutProps: {
        html: statusQuoMarkdown.toString(),
      },
      employmentDataProps: {
        html: employmentMarkdown.toString(),
      },
    },
  };
};
