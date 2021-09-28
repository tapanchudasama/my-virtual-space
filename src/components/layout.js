import React from "react";
import { SlideFade, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const Layout = ({ children }) => {
  const value = useColorModeValue("gray.100");

  return (
    <Box backgroundColor={value}>
      <SlideFade
        in={true}
        backgroundColor={value}
        offsetY={20}
        transition={{ duration: 1 }}
      >
        {children}
      </SlideFade>
    </Box>
  );
};

export default Layout;
