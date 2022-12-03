import { FC, Fragment, ReactNode, useEffect } from "react";

interface BlogLayoutProps {
  slug: string;
  children: ReactNode;
}

const Layout: FC<BlogLayoutProps> = ({ slug, children }) => {
  useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: "POST",
    });
  }, [slug]);

  return <Fragment>{children}</Fragment>;
};

export default Layout;
