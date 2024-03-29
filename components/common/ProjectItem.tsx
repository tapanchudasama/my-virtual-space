import { FaCodeBranch, FaLink } from "react-icons/fa";
import { Project as ProjectType } from "../SideProjects";

const Project = ({ node }: { node: ProjectType }) => {
  return (
    <div className="prose flex flex-col w-full">
      <p className="text-xl lg:text-2xl font-semibold">
        {node.frontmatter.title}
      </p>
      <div>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="-ml-2 flex flex-wrap items-center">
          {node.frontmatter.techs.map((t, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 mt-2 text-xs xl:text-sm rounded-sm bg-gray-500 ml-2`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 items-center">
          {node.frontmatter.repo_link_backend && (
            <a
              aria-label="source-code-backend"
              className="cursor-pointer border-none"
              href={node.frontmatter.repo_link_backend}
            >
              <FaCodeBranch className="w-4 h-4 lg:w-6 lg:h-6" />
            </a>
          )}
          {node.frontmatter.repo_link_frontend && (
            <a
              aria-label="source-code-frontend"
              className="cursor-pointer border-none"
              href={node.frontmatter.repo_link_frontend}
            >
              <FaCodeBranch className="w-4 h-4 lg:w-6 lg:h-6" />
            </a>
          )}
          <a
            aria-label="demo"
            className="cursor-pointer border-none"
            href={node.frontmatter.demo_link}
          >
            <FaLink className="w-4 h-4 lg:w-6 lg:h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Project;
