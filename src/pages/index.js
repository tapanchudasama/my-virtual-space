import React from "react";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Helmet } from "react-helmet";
import About from "../components/about";
import Header from "../components/Header";
import Hero from "../components/hero";
import Footer from "../components/Footer";

const Index = () => {
  const value = useColorModeValue("gray.100");
  return (
    <Box backgroundColor={value}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>tapan chudasama • home</title>
      </Helmet>
      <Header />
      <Hero />
      <About />
      <Footer />
    </Box>
  );
};
export default Index;
