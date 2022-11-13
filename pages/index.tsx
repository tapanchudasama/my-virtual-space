import { promises as fs } from "fs";
import type { GetStaticProps, NextPage } from "next";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Seo from "../components/Seo";
import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import PageViews from "../components/PageViews";
import Header from "../components/Header";

type Props = {
  aboutProps: {
    html: string;
  };
  workDataProps: {
    html: string;
  };
};

const Home: NextPage<Props> = ({ aboutProps, workDataProps }) => {
  return (
    <Layout slug="index">
      <div className="overflow-hidden bg-gray-800 text-white font-serif">
        <Seo titleTemplate="home" />
        <Header />
        <Hero />
        <div className="container space-y-16 py-16">
          <About {...aboutProps} />
          <Work {...workDataProps} />
          <Contact />
        </div>
        <PageViews slug="index" />
      </div>
    </Layout>
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
      workDataProps: {
        html: employmentMarkdown.toString(),
      },
    },
  };
};
