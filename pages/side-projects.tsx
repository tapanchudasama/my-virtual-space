import { promises as fs } from "fs";
import React from "react";
import { GetStaticProps, NextPage } from "next";
import matter from "gray-matter";
import path from "path";
import html from "remark-html";
import { remark } from "remark";

import Seo from "../components/Seo";
import ProjectItem from "../components/common/ProjectItem";
import { Project } from "../components/SideProjects";

const HEADING = "side projects";

const Works: NextPage<{ projects: Project[] }> = ({ projects }) => {
  console.log(projects);

  return (
    <div className="bg-gray-800 text-white font-serif h-full">
      <div className="container pt-28">
        <Seo titleTemplate="side projects" />
        <p className="text-3xl md:text-4xl lg:text-5xl py-6 flex space-x-2 leading-tight font-bold">
          {HEADING}
        </p>
        <p className="text-md lg:text-lg">
          stuff that i have built in my free time, either to learn some new tech
          or scratch my own itch. this includes this website also.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 py-16 gap-16">
          {projects.map((n) => {
            return <ProjectItem key={n.frontmatter.title} node={n} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Works;

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      projects: await Promise.all(projects),
    },
  };
};
