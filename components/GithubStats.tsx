import React, { ReactNode, useCallback, useEffect } from "react";
import { GoCode, GoRepo } from "react-icons/go";

export type GitHubData = {
  totalCommits: number;
  repositories: { language: string }[];
};

const GithubStats = () => {
  const [githubData, setGithubData] = React.useState<GitHubData | undefined>();
  const [majorityLanguage, setMajorityLanguage] = React.useState("");
  const [majorityLanguagePercent, setMajorityLanguagePercent] =
    React.useState<number>(0);

  const findMajorityLanguage = () => {
    let totalLanguages = 0;
    let majorityLanguage = "";
    const map = new Map<string, number>();

    githubData?.repositories.forEach((node) => {
      if (!node.language) {
        return;
      }
      const lowercasedLang = node.language.toLowerCase();
      map.set(
        lowercasedLang,
        map.has(lowercasedLang) ? (map.get(lowercasedLang) || 0) + 1 : 1
      );
    });

    let MIN_VALUE = 0;
    map.forEach((v, k) => {
      totalLanguages += 1;
      if (v > MIN_VALUE) {
        MIN_VALUE = v;
        majorityLanguage = k;
      }
    });

    console.log((map.get(majorityLanguage) || 0) / totalLanguages);
    return [
      majorityLanguage[0].toUpperCase() + majorityLanguage.slice(1),
      (map.get(majorityLanguage) || 0) / totalLanguages,
    ];
  };

  const fetchData = async () => {
    try {
      const data = await Promise.all([
        fetch("https://api.github.com/search/commits?q=author:tapanchudasama", {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_PAT,
            "Content-Type": "application/json",
          },
        }),
        fetch("https://api.github.com/user/repos", {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_PAT,
            "Content-Type": "application/json",
          },
        }),
      ]);

      const d = await Promise.all([data[0].json(), data[1].json()]);

      setGithubData({
        totalCommits: d[0].total_count,
        repositories: d[1],
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchData().then(() => {
      const l = findMajorityLanguage();
      setMajorityLanguage(l[0] as string);
      setMajorityLanguagePercent(l[1] as number);
    });
  }, []);

  return (
    <div className="w-full my-8 py-16 bg-gray-700">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center text-base lg:text-lg gap-4">
          <Stat
            icon={<GoRepo className="w-6 h-6 lg:w-8 lg:h-8" />}
            label="Total Commits (Public Repos)"
            meta={githubData?.totalCommits}
          />
          {/* <Stat
            icon={<GoGitMerge className="w-6 h-6 lg:w-8 lg:h-8" />}
            label="Open Source Contributions"
            meta={user.repositoriesContributedTo.totalCount}
          /> */}
          <Stat
            icon={<GoCode className="w-6 h-6 lg:w-8 lg:h-8" />}
            label="Most used Language"
            meta={`${majorityLanguage} ${Math.trunc(
              majorityLanguagePercent * 100
            )} %`}
          />
        </div>
      </div>
    </div>
  );
};

const Stat = ({
  icon,
  label,
  meta,
}: {
  icon: ReactNode;
  label: string;
  meta: any;
}) => {
  return (
    <div className="flex flex-col w-full items-center justify-center text-center space-y-2 lg:space-y-4">
      {icon}
      <div className="flex flex-col space-between items-center space-x-6">
        <p>{label}</p>
        <p className="font-bold">{meta}</p>
      </div>
    </div>
  );
};
export default GithubStats;
