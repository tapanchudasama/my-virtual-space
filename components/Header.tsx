import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Navigation from "./Navigation";
import NavbarItems from "../content/navitems.json";
import { useRouter } from "next/router";

const Header = () => {
  const { pathname } = useRouter();

  // @ts-ignore
  const navItems: { name: string; path: string }[] = NavbarItems.navbarItems;
  return (
    <header className="bg-gray-700 fixed z-10 w-full shadow-md">
      <div className="container font-oxygen">
        <div className="flex items-center justify-around py-6">
          <Link href="/">
            <p
              className={`${
                pathname === "/" ? "text-gray-700 bg-white" : ""
              } px-4 cursor-pointer text-2xl lg:text-3xl font-bold`}
            >
              home
            </p>
          </Link>
          {navItems.map((item, index) => (
            <div
              className="relative cursor-pointer"
              key={item.name + "-" + index}
            >
              <Link href={`/${item.path}`}>
                <p
                  className={`${
                    pathname === "/" + item.path ? "text-gray-700 bg-white" : ""
                  } px-4 text-2xl lg:text-3xl font-bold`}
                >
                  {item.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
