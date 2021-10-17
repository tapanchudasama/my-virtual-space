import { AnimatePresence, motion } from "framer-motion";
import { Link } from "gatsby";
import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Navigation from "./navigation";

const Header = () => {
  const [showNavigation, setShowNavigation] = React.useState(false);
  if (showNavigation) {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  } else {
    document.getElementsByTagName("html")[0].style.overflow = "visible";
  }
  return (
    <header>
      <div className="container mx-auto px-4 lg:px-16 ">
        <div className="flex items-center justify-between py-8">
          <Link to="/">
            <p className="text-md lg:text-xl font-bold">home</p>
          </Link>
          <div className="flex items-center space-x-8">
            {/* <div>
              <ToggleTheme />
            </div> */}
            <button onClick={() => setShowNavigation(true)}>
              <HiOutlineMenuAlt3 className="w-4 h-4 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {showNavigation && (
          <motion.div
            className="fixed w-full h-screen top-0 z-10"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ mass: 1 }}
          >
            <div className="bg-black bg-opacity-30" />
            <div className="w-full h-full">
              <Navigation setShowNavigation={setShowNavigation} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
