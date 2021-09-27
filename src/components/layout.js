import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/color-mode";

const MotionBox = motion(Box);

const Layout = ({ children }) => {
  const value = useColorModeValue("gray.100");

  return (
    <MotionBox
      backgroundColor={value}
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{
        type: "spring",
        mass: 0.35,
        stiffness: 75,
        duration: 0.3,
      }}
    >
      {children}
    </MotionBox>
  );
};

export default Layout;
