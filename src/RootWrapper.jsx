import { ChakraProvider } from "@chakra-ui/provider";
import "@fontsource/ibm-plex-sans";
import { AnimatePresence } from "framer-motion";
import React from "react";
import theme from "./@chakraui/gatsby-plugin/theme";

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
    </ChakraProvider>
  );
};
