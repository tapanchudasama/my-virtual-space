import React from "react";
import { FaHeart } from "react-icons/fa";
import { useSiteMetadata } from "../hooks/use-site-metadata";

const Footer = () => {
  const { siteMetadata } = useSiteMetadata();
  return (
    <div className="p-8 bg-gray-700">
      <div className="container mx-auto px-8 lg:px-16">
        <footer className="flex flex-col-reverse md:flex-row items-center justify-between">
          <p className="text-base lg:text-lg flex items-center space-x-2 font-oxygen">
            <p>Made with</p>
            <FaHeart className="w-4 h-4 lg:w-6 lg:h-6 fill-red-500" />
            <p>by</p>
            <p className="capitalize font-bold inline">{siteMetadata.name}</p>
          </p>
          <div className="mb-6 md:mb-0">
            <a
              href="https://www.buymeacoffee.com/tapanchudasama"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-48 lg:w-64"
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
