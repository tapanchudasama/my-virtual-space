import { graphql, useStaticQuery } from "gatsby";
import React, { useCallback, useEffect } from "react";
import { GoCode, GoGitMerge, GoRepo } from "react-icons/go";

const GithubStats = () => {
  const [majorityLanguage, setMajorityLanguage] = React.useState("");
  const [majorityLanguagePercent, setMajorityLanguagePercent] =
    React.useState("");
  const { githubData } = useStaticQuery(graphql`
    query MyQuery {
      githubData {
        data {
          user {
            contributionsCollection {
              contributionYears
              hasAnyContributions
            }
            createdAt
            repositoriesContributedTo {
              totalCount
            }
            repositories {
              edges {
                node {
                  name
                  stargazers {
                    totalCount
                  }
                  languages {
                    totalCount
                    edges {
                      node {
                        color
                        name
                      }
                      size
                    }
                  }
                }
              }
              totalCount
            }
          }
        }
      }
    }
  `);
  const { data } = githubData;
  const { user } = data;

  const findMajorityLanguage = useCallback(() => {
    let totalLanguages = 0;
    let majorityLanguage = "";
    const map = new Map();
    user.repositories.edges.forEach(({ node }) => {
      if (node.languages.totalCount) {
        totalLanguages += node.languages.totalCount;
        node.languages.edges.forEach(({ node }) => {
          map.set(node.name, map.has(node.name) ? map.get(node.name) + 1 : 1);
        });
      }
    });

    let MIN_VALUE = 0;
    for (const [k, v] of map) {
      if (v > MIN_VALUE) {
        MIN_VALUE = v;
        majorityLanguage = k;
      }
    }

    return [majorityLanguage, map.get(majorityLanguage) / totalLanguages];
  }, [user.repositories.edges]);

  useEffect(() => {
    const l = findMajorityLanguage();
    setMajorityLanguage(l[0]);
    setMajorityLanguagePercent(l[1]);
  }, [findMajorityLanguage]);

  return (
    <div className="w-full my-8 py-16 bg-gray-700" width="100%">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center text-base lg:text-lg gap-4">
          <Stat
            icon={<GoRepo className="w-6 h-6 lg:w-8 lg:h-8" />}
            label="Total Repositories"
            meta={user.repositories.totalCount}
          />
          <Stat
            icon={<GoGitMerge className="w-6 h-6 lg:w-8 lg:h-8" />}
            label="Open Source Contributions"
            meta={user.repositoriesContributedTo.totalCount}
          />
          <Stat
            icon={<GoCode className="w-6 h-6 lg:w-8 lg:h-8" />}
            label="Most used Language"
            meta={`${majorityLanguage} ${Math.round(
              majorityLanguagePercent * 100
            )} %`}
          />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, label, meta }) => {
  return (
    <div className="flex flex-col w-full items-center text-center space-y-2 lg:space-y-4">
      {icon}
      <div className="flex space-between items-center space-x-6">
        <p>{label}</p>
        <p className="font-bold">{meta}</p>
      </div>
    </div>
  );
};
export default GithubStats;
