import Link from "next/link";
import React from "react";
import { MdClose } from "react-icons/md";
import { navbarItems } from "../content/navitems.json";

const Navigation = ({
  setShowNavigation,
}: {
  setShowNavigation: (show: boolean) => void;
}) => {
  return (
    <div className="bg-gray-800 overflow-hidden w-full h-full">
      <div className="container h-full font-oxygen">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end py-8">
            <div
              role="button"
              aria-label="Toggle Navigation"
              tabIndex={0}
              onKeyDown={() => setShowNavigation(false)}
              onClick={() => setShowNavigation(false)}
            >
              <MdClose className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="space-y-4">
              {navbarItems.map((item, index) => (
                <div
                  className="relative cursor-pointer"
                  key={item.name + "-" + index}
                >
                  <Link href={`/${item.path}`}>
                    <p className="text-4xl md:text-5xl lg:text-6xl text-center font-bold">
                      {item.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
