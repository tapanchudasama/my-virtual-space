import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import NavbarItems from "../content/navitems.json";
import { useRouter } from "next/router";
import { useState } from "react";

const Header = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const { pathname } = useRouter();

  // @ts-ignore
  const navItems: { name: string; path: string }[] = NavbarItems.navbarItems;
  return (
    <header className="bg-gray-700 fixed z-10 w-full shadow-md">
      <div className="container font-oxygen">
        <div className="flex md:hidden justify-between items-center py-6">
          <Link href="/">
            <p
              className={`${
                pathname === "/" ? "text-gray-700 bg-white" : ""
              } px-4 cursor-pointer text-xl font-bold`}
            >
              home
            </p>
          </Link>
          <div
            className="select-none"
            onClick={() => setShowNavigation(!showNavigation)}
          >
            {showNavigation ? (
              <IoMdClose className="w-8 h-8 fill-white" />
            ) : (
              <AiOutlineMenu className="w-8 h-8 fill-white" />
            )}
          </div>
        </div>
        {showNavigation && (
          <div className="bg-gray-700 flex flex-col space-y-8 pb-4 -px-4">
            {navItems.map((item, index) => (
              <div
                className="relative cursor-pointer"
                key={item.name + "-" + index}
              >
                <Link href={`/${item.path}`}>
                  <span
                    className={`${
                      pathname === "/" + item.path
                        ? "text-gray-700 bg-white"
                        : ""
                    } px-4 text-xl font-bold`}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="hidden md:flex items-center justify-around py-5">
          <Link href="/">
            <p
              className={`${
                pathname === "/" ? "text-gray-700 bg-white" : ""
              } px-4 cursor-pointer text-2xl font-bold`}
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
                  } px-4 text-2xl font-bold`}
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
