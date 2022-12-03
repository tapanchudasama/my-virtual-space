import { FC, Fragment, useEffect, useState } from "react";

interface PageViewsProps {
  slug: string;
}

const PageViews: FC<PageViewsProps> = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{ total: number } | undefined>({
    total: 100,
  });

  useEffect(() => {
    fetch(`/api/views/${slug}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch(() => setData(undefined))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const expressionList = [
    {
      limit: 0,
      expression: "wow",
    },
    {
      limit: 100,
      expression: "woah",
    },
    {
      limit: 1000,
      expression: "holy smokes",
    },
  ];

  let expression;
  expressionList.forEach((e) => {
    if (data?.total && data.total >= e.limit) {
      expression = e.expression;
      return;
    }
  });

  return (
    <div className="flex items-right justify-center space-x-1 w-full font-sans p-6 italic text-sm text-gray-400">
      {isLoading && <p className="w-72 h-4 animate-pulse bg-slate-200"></p>}
      {!isLoading && data?.total && (
        <p>
          {expression} this page has been viewed {data.total} times!
        </p>
      )}
    </div>
  );
};

export default PageViews;
