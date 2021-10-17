import { motion } from "framer-motion";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col">
      <Header />
      <motion.div
        className="flex-1"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {children}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Layout;
