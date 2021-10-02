import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Header from "../components/header";
import Footer from "../components/footer";
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
