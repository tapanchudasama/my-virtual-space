import { AnimatePresence, motion } from "framer-motion";
import { Link } from "gatsby";
import React from "react";
import { MdClose } from "react-icons/md";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { borderVariants } from "../components/work-section";

const Navigation = ({ setShowNavigation }) => {
  const {
    siteMetadata: { navbarItems },
  } = useSiteMetadata();

  return (
    <div className="bg-gray-800 overflow-hidden w-full h-full">
      <AnimatePresence>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          className="container mx-auto px-4 lg:px-8 h-full font-oxygen"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end py-8">
              <Link to="/">
                <MdClose className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer fill-white" />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="space-y-4">
                {navbarItems.map((item, index) => (
                  <motion.div
                    className="relative cursor-pointer"
                    initial="hidden"
                    whileHover="visible"
                    key={item.name + "-" + index}
                  >
                    <Link to={`${item.path}`}>
                      <p className="text-4xl md:text-5xl lg:text-6xl text-center font-bold text-white">
                        {item.name}
                      </p>
                    </Link>
                    <motion.div
                      className="border border-yellow-600"
                      variants={borderVariants}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Navigation;
