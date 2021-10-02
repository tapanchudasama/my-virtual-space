import React from "react";
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import About from "../components/about";
import Works from "../components/work-section";
import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";
import GithubStats from "../components/github-stats";
import StatusQuo from "../components/StatusQuo";

const Index = () => {
  return (
    <Box overflow="hidden">
      <Helmet>
        <meta charSet="utf-8" />
        <title>tapan chudasama • home</title>
      </Helmet>
      <Header />
      <Hero />
      <StatusQuo />
      <Works />
      <GithubStats />
      <About />
      <Footer />
    </Box>
  );
};
export default Index;
