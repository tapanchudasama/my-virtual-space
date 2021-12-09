import { AnimatePresence, motion } from "framer-motion";
import { Link } from "gatsby";
import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Navigation from "./navigation";

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
    <header>
      <div className="container mx-auto px-4 lg:px-16 font-oxygen">
        <div className="flex items-center justify-between py-8">
          <Link to="/">
            <p className="text-2xl lg:text-3xl font-bold">home</p>
          </Link>
          <div className="flex items-center space-x-8">
            {/* <div>
              <ToggleTheme />
            </div> */}
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
