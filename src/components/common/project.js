import React from "react";
import { BiCodeAlt, BiLinkExternal } from "react-icons/bi";

const Project = ({ node }) => {
  return (
    <div className="flex flex-col w-full">
      <p className="lg:text-lg font-semibold">{node.frontmatter.title}</p>
      <p>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      </p>
      <div className="flex items-center justify-between w-full">
        <div className="-ml-2 flex flex-wrap items-center">
          {node.frontmatter.techs.map((t, index) => (
            <span
              className={`px-2 py-0.5 mt-2 text-base xl:text-md rounded-sm bg-gray-500 ml-2`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 items-center">
          {node.frontmatter.repo_link_backend && (
            <a
              aria-label="source-code-backend"
              className="cursor-pointer"
              href={node.frontmatter.repo_link_backend}
            >
              <BiCodeAlt className="w-6 h-6 lg:w-8 lg:h-8" />
            </a>
          )}
          {node.frontmatter.repo_link_frontend && (
            <a
              aria-label="source-code-frontend"
              href={node.frontmatter.repo_link_frontend}
            >
              <BiCodeAlt className="w-6 h-6 lg:w-8 lg:h-8" />
            </a>
          )}
          <a
            aria-label="demo"
            className="cursor-pointer"
            href={node.frontmatter.demo_link}
          >
            <BiLinkExternal className="w-6 h-6 lg:w-8 lg:h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Project;
