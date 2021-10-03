import React from "react";
import { Box } from "@chakra-ui/react";
import About from "../components/about";
import Works from "../components/work-section";
import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";
import GithubStats from "../components/github-stats";
import StatusQuo from "../components/StatusQuo";
import Seo from "../components/seo";

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
