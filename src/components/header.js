import { AnimatePresence, motion } from "framer-motion";
import { Link } from "gatsby";
import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Navigation from "../pages/navigation";

const Header = () => {
  const [showNavigation, setShowNavigation] = React.useState(false);
  React.useEffect(() => {
    if (showNavigation) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "visible";
    }
  }, [showNavigation]);
  return (
    <header className="bg-gray-700 fixed z-10 w-full shadow-md">
      <div className="container mx-auto px-4 lg:px-8 font-oxygen">
        <div className="flex items-center justify-between py-6">
          <Link to="/">
            <p className="text-2xl lg:text-3xl font-bold">home</p>
          </Link>
          <div className="flex items-center space-x-8">
            {/* <div>
              <ToggleTheme />
            </div> */}
            <Link to="/navigation">
              <HiOutlineMenuAlt3 className="w-8 h-8 lg:w-10 lg:h-10" />
            </Link>
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
