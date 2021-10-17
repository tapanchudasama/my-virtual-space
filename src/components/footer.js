import React from "react";
import { FaHeart } from "react-icons/fa";
import { useSiteMetadata } from "../hooks/use-site-metadata";

const Footer = () => {
  const { siteMetadata } = useSiteMetadata();
  return (
    <div className="p-4 bg-gray-700" p={4}>
      <div className="container mx-auto px-4 lg:px-16">
        <footer className="flex items-center justify-between">
          <p className="text-xs lg:text-sm flex items-center space-x-1">
            <p>Made with</p>
            <FaHeart className="w-2 h-2 lg:w-4 lg:h-4 fill-red-500" />
            <p>by</p>
            <p className="capitalize font-semibold inline">
              {siteMetadata.name}
            </p>
          </p>
          <div className="w-52 h-14">
            <a
              href="https://www.buymeacoffee.com/tapanchudasama"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-52 h-14"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
              ></img>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Footer;
