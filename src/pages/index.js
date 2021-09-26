import React from "react";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Helmet } from "react-helmet";
import About from "../components/about";
import Projects from "../components/projects";
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
        <Projects />
        <About />
        <Footer />
      </Box>
    </React.Fragment>
  );
};
export default Index;
