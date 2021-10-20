import React from "react";
import { BiCodeAlt, BiLinkExternal } from "react-icons/bi";

const Project = ({ node }) => {
  return (
    <div className="flex flex-col w-full">
      <p className="text-md lg:text-lg font-semibold">
        {node.frontmatter.title}
      </p>
      <p className="text-sm lg:text-md" fontSize={["sm", "md"]}>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      </p>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-wrap items-center">
          {node.frontmatter.techs.map((t, index) => (
            <span
              className={`px-2 py-0.5 mt-2 text-xs rounded-sm bg-gray-500 ${
                index > 0 ? "ml-2" : 0
              }`}
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
              <BiCodeAlt className="w-5 h-5" />
            </a>
          )}
          {node.frontmatter.repo_link_frontend && (
            <a
              aria-aria-label="source-code-frontend"
              href={node.frontmatter.repo_link_frontend}
            >
              <BiCodeAlt className="w-5 h-5" />
            </a>
          )}
          <a
            aria-label="demo"
            className="cursor-pointer"
            href={node.frontmatter.demo_link}
          >
            <BiLinkExternal className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Project;
