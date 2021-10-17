import { motion } from "framer-motion";
import { Link } from "gatsby";
import React from "react";
import { MdClose } from "react-icons/md";

export const borderVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const Navigation = ({ setShowNavigation }) => {
  return (
    <div
      className="bg-gray-800 overflow-hidden w-full h-full"
      overflow="hidden"
    >
      <div className="container mx-auto px-4 lg:px-16 h-full" maxWidth="6xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end py-8">
            <div onClick={() => setShowNavigation(false)}>
              <MdClose className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="space-y-4">
              {["readings", "writings"].map((label, index) => (
                <motion.div
                  className="relative cursor-pointer"
                  initial="hidden"
                  whileHover="visible"
                  key={label + "-" + index}
                >
                  <Link to={`/${label}`}>
                    <p className="text-3xl md:text-4xl lg:text-5xl text-center">
                      {label}
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
      </div>
    </div>
  );
};

export default Navigation;
