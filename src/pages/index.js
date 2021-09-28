import React from "react";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Helmet } from "react-helmet";
import About from "../components/about";
import Works from "../components/work-section";
import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";

const Index = () => {
  const value = useColorModeValue("gray.100");
  return (
    <React.Fragment>
      <Box backgroundColor={value}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>tapan chudasama • home</title>
        </Helmet>
        <Header />
        <Hero />
        <Works />
        <About />
        <Footer />
      </Box>
    </React.Fragment>
  );
};
export default Index;
