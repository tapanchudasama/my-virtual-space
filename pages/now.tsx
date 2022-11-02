import { GetServerSideProps } from "next";
import React, { Fragment, useEffect } from "react";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { promises as fs } from "fs";
import readingTime from "reading-time";

import Seo from "../components/Seo";
import SpotifyRecentlyPlayed from "../components/SpotifyRecentlyPlayed";
import Image from "next/image";
import Header from "../components/Header";

const HEADING = "now";

const Now = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="bg-gray-800 text-white">
        <div className="container">
          <Header />
          <Seo titleTemplate="blog" />
          <div className="py-6 space-y-2">
            <p className="text-3xl md:text-4xl lg:text-5xl flex space-x-2 leading-tight font-bold font-serif">
              {HEADING}
            </p>
          </div>
          <p className="text-md lg:text-lg">
            everything which i am listening/reading/watching recently.
          </p>
          <div className="grid grid-cols-3 gap-16 py-16">
            <div className="flex flex-col items-center space-y-4 font-sans">
              <p className="font-bold sm:text-md lg:text-xl">listening to</p>
              <SpotifyRecentlyPlayed />
            </div>
            <div className="flex flex-col items-center space-y-4 font-sans">
              <p className="font-bold sm:text-md lg:text-xl">reading</p>
              <div>
                <Image
                  width={200}
                  height={300}
                  alt="book i am currently reading"
                  src="https://covers.openlibrary.org/b/isbn/9781509848997-L.jpg?default=false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Now;
