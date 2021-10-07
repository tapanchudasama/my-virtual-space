import "@fontsource/ibm-plex-sans";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { AnimatePresence } from "framer-motion";
import theme from "./@chakraui/gatsby-plugin/theme";

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
    </ChakraProvider>
  );
};
