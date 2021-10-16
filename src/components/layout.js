import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
const MotionBox = motion(Box);

const Layout = ({ children }) => {
  const value = useColorModeValue();

  return (
    <Box
      backgroundColor={value}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Header />
      <MotionBox
        flexGrow="1"
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
