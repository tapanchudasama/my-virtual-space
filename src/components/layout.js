import React from "react";
import { SlideFade, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Header from "../components/header";
import Footer from "../components/footer";
const MotionBox = motion(Box);

const Layout = ({ children }) => {
  const value = useColorModeValue("gray.100");

  return (
    <Box backgroundColor={value}>
      <Header />
      <MotionBox
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {children}
      </MotionBox>
      <Footer />
    </Box>
  );
};

export default Layout;
