import React, { useEffect } from "react";
import Project from "./common/ProjectItem";

const HEADING = "some of my side projects";

export type Project = {
  html: string;
  frontmatter: {
    title: string;
    featured: boolean;
    date: string;
    demo_link: string;
    repo_link_backend?: string;
    repo_link_frontend?: string;
    techs: string[];
  };
};
const SideProjects = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="container pt-28">
      <p className="text-3xl xl:text-4xl py-6 flex space-x-2 leading-tight font-bold">
        {HEADING}
      </p>
      <div className="grid grid-col-1 lg:grid-cols-2 gap-24 py-16">
        {projects.map((p, i) => {
          return <Project key={i} node={p} />;
        })}
      </div>
      <div className="flex items-center justify-center pt-16">
        <div className="cursor-pointer relative">
          <p className="text-lg lg:text-xl hover:font-bold">
            {/* <Link to="/works">view my all works</Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideProjects;
