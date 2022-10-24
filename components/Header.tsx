import Link from "next/link";
// import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// import Navigation from "./navigation";

const Header = () => {
  // const [showNavigation, setShowNavigation] = React.useState(false);
  // useEffect(() => {
  //   if (showNavigation) {
  //     document.getElementsByTagName("html")[0].style.overflow = "hidden";
  //   } else {
  //     document.getElementsByTagName("html")[0].style.overflow = "visible";
  //   }
  // }, [showNavigation]);
  return (
    <header className="bg-gray-700 fixed z-10 w-full shadow-md">
      <div className="container font-oxygen">
        <div className="flex items-center justify-between py-6">
          <Link href="/">
            <p className="text-2xl lg:text-3xl font-bold">home</p>
          </Link>
          <div className="flex items-center space-x-8">
            <div
              role="button"
              aria-label="Toggle Navigation"
              tabIndex={0}
              onKeyDown={() => setShowNavigation(true)}
              onClick={() => setShowNavigation(true)}
            >
              <HiOutlineMenuAlt3 className="w-8 h-8 lg:w-10 lg:h-10" />
            </div>
          </div>
        </div>
      </div>
      {/* {showNavigation && (
        <motion.div
          className="fixed w-full h-screen top-0 z-10"
          initial={{ x: "10%" }}
          animate={{ x: "0%" }}
        >
          <div className="bg-black bg-opacity-30" />
          <div className="w-full h-full">
            <Navigation setShowNavigation={setShowNavigation} />
          </div>
        </motion.div>
      )} */}
    </header>
  );
};

export default Header;
