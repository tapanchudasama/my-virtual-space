import { promises as fs } from "fs";
import type { GetStaticProps, NextPage } from "next";
import path from "path";
import Header from "../components/Header";
import Hero, { HeroProps } from "../components/Hero";
import StatusQuo from "../components/StatusQuo";
import SideProjects, { Project } from "../components/SideProjects";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import About from "../components/About";

type Props = {
  heroProps: HeroProps;
  statusQuoProps: {
    html: string;
  };
  sideProjectsProps: Project[];
  aboutData: About;
};

const Home: NextPage<Props> = ({
  heroProps,
  statusQuoProps,
  sideProjectsProps,
  aboutData,
}) => {
  return (
    <div className="overflow-hidden bg-gray-800 text-white font-oxygen">
      {/* <Seo titleTemplate="%s · home" /> */}
      <Header />
      <Hero {...heroProps} />
      <StatusQuo {...statusQuoProps} />
      <SideProjects projects={sideProjectsProps} />
      {/* <GithubStats /> */}
      <About {...aboutData} />
      {/* <StatusQuo />
      <Works />
      <About />
      <Footer /> */}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  let githubData;
  const socialMediaLinks: HeroProps = JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), "content", "social_media.json"),
      "utf8"
    )
  );

  const siteMetadata: { name: string; description: string } = JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), "content", "site_metadata.json"),
      "utf8"
    )
  );

  const statusQuo = matter(
    await fs.readFile(
      path.join(process.cwd(), "content", "status_quo.md"),
      "utf-8"
    )
  );
  const statusQuoMarkdown = await remark()
    .use(html)
    .process(statusQuo.content || "");

  const sideProjectsDir = path.join(process.cwd(), "content/works");
  const sideProjects = await fs.readdir(sideProjectsDir);

  const projects = sideProjects.map(async (filename) => {
    const filePath = path.join(sideProjectsDir, filename);
    const fileContents = matter(await fs.readFile(filePath, "utf8"));

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    const markdown = await remark()
      .use(html)
      .process(fileContents.content || "");

    return {
      frontmatter: fileContents.data,
      html: markdown.toString(),
    };
  });

  const aboutData = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "content", "about.json"), "utf8")
  );

  console.log(aboutData);

  return {
    props: {
      heroProps: {
        mail: socialMediaLinks.mail,
        reddit: socialMediaLinks.reddit,
        twitter: socialMediaLinks.twitter,
        github: socialMediaLinks.github,
        linkedin: socialMediaLinks.linkedin,
        name: siteMetadata.name,
        description: siteMetadata.description,
      },
      statusQuoProps: {
        html: statusQuoMarkdown.toString(),
      },
      sideProjectsProps: await Promise.all(projects),
      aboutData: aboutData,
    },
  };
};
