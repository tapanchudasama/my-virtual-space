import Image from "next/image";
import React from "react";
import { SiJavascript } from "react-icons/si";
import SideMetadata from "../content/site_metadata.json";

const Footer = () => {
  const myLoader = () => {
    return "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png";
  };
  return (
    <div className="p-4 bg-gray-700">
      <div className="container">
        <footer className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="text-base lg:text-lg flex items-center space-x-2 font-oxygen">
            <span>Made with</span>
            <SiJavascript
              key="tb-js"
              className="w-4 h-4 lg:w-6 lg:h-6 fill-yellow-500"
            />
            <span>by</span>
            <p className="capitalize font-bold inline">{SideMetadata.name}</p>
          </div>
          <div className="mb-6 md:mb-0">
            <a
              href="https://www.buymeacoffee.com/tapanchudasama"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                loader={myLoader}
                width={240}
                height={70}
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
              ></Image>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Footer;
