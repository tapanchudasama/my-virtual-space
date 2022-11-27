import { GetServerSideProps } from "next";
import React, { Fragment, useEffect } from "react";

import Seo from "../components/Seo";
import SpotifyRecentlyPlayed from "../components/SpotifyRecentlyPlayed";
import Header from "../components/Header";
import Tweets from "../components/Tweets";
import Script from "next/script";
import CurrentlyReading from "../components/CurrentlyReading";
import Layout from "../components/Layout";
import PageViews from "../components/PageViews";

const HEADING = "now";

const Now = () => {
  return (
    <Layout slug="now">
      <div className="min-h-screen bg-gray-800 text-white">
        <Header />
        <div className="bg-gray-800 text-white">
          <div className="container">
            <Seo titleTemplate="blog" />
            <p className="heading">{HEADING}</p>
            <p className="sub-heading">
              everything which i am listening/reading/watching recently.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center py-16 gap-32">
              <div className="flex flex-col items-center font-sans space-y-8">
                <p className="font-bold text-3xl lg:text-4xl font-serif">
                  tweeting:
                </p>
                <div className="flex justify-center">
                  <Tweets />
                </div>
              </div>
              <div className="flex flex-col items-center font-sans space-y-8">
                <p className="font-bold text-3xl lg:text-4xl font-serif">
                  reading:
                </p>
                <div className="flex justify-center">
                  <CurrentlyReading />
                </div>
              </div>
              <div className="flex flex-col items-center font-sans space-y-8">
                <p className="font-bold text-3xl lg:text-4xl font-serif">
                  listening:
                </p>
                <div className="flex justify-center">
                  <SpotifyRecentlyPlayed />
                </div>
              </div>
            </div>
          </div>
        </div>
        <PageViews slug="now" />
      </div>
    </Layout>
  );
};

export default Now;
