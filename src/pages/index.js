import { Box } from "@chakra-ui/react";
import React from "react";
import About from "../components/about";
import Footer from "../components/footer";
import GithubStats from "../components/github-stats";
import Header from "../components/header";
import Hero from "../components/hero";
import Seo from "../components/seo";
import StatusQuo from "../components/StatusQuo";
import Works from "../components/work-section";

const Index = () => {
  return (
    <Box overflow="hidden">
      <Seo titleTemplate="%s · home" />
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
