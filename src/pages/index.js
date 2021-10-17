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
    <div className="overflow-hidden bg-gray-800 text-white font-body">
      <Seo titleTemplate="%s · home" />
      <Header />
      <Hero />
      <StatusQuo />
      <Works />
      <GithubStats />
      <About />
      <Footer />
    </div>
  );
};
export default Index;
