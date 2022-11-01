import React, { ReactNode, useEffect } from "react";
import {
  FaHeadphones,
  FaLightbulb,
  FaNetworkWired,
  FaStarOfLife,
  FaTwitter,
} from "react-icons/fa";
import SpotifyRecentlyPlayed from "./SpotifyRecentlyPlayed";
import Image from "next/image";
import Script from "next/script";

const HEADING = "some things about me";

type About = {
  mbti_type: string;
  hobbies: string[];
  about_image: string;
};
const About = ({ about_image, mbti_type, hobbies }: About) => {
  return (
    <div className="container mt-32">
      <p className="text-3xl xl:text-4xl py-6 flex space-x-2 leading-tight font-bold">
        {HEADING}
      </p>

      <div className="flex flex-col py-4 mt-4">
        <div className="self-center w-40 md:w-60 lg:w-80">
          <Image
            style={{ borderRadius: "100%" }}
            src={about_image}
            alt="My Picture"
            width={500}
            height={500}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 pt-8 justify-center items-start gap-16 text-sm lg:text-md">
          <AboutMeta
            icon={<FaStarOfLife className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <div className="text-center">
                I enjoy{" "}
                {hobbies.map((h, index) => {
                  return (
                    <p key={index} className="inline font-bold">
                      {h}
                      {index === hobbies.length - 1 ? "" : ","}{" "}
                    </p>
                  );
                })}
                . Doing a Europe tour is one of the items in my bucket list.
              </div>
            }
          />
          <AboutMeta
            icon={<FaNetworkWired className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <div className="text-center">
                My{" "}
                <a
                  className="font-bold"
                  href="https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator"
                >
                  Myers-Briggs Type Indicator (MBTI)
                </a>{" "}
                is{" "}
                <a
                  className="font-bold"
                  href="https://www.16personalities.com/intj-personality?utm_source=email&utm_medium=welcome-architect&utm_campaign=description"
                >
                  {mbti_type}.
                </a>{" "}
                (Introverted, Intuitive, Thinking, and Judging)
              </div>
            }
          />
          <AboutMeta
            icon={<FaLightbulb className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <p className="text-center">
                I enjoy talking about intellectually stimulating topics, be it
                any field.
              </p>
            }
          />
          <AboutMeta
            className="col-span-full"
            icon={<FaHeadphones className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <>
                <p className="text-center">Currently I am listening to:</p>
                <SpotifyRecentlyPlayed />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

const AboutMeta = ({
  icon,
  meta,
  className,
}: {
  icon: ReactNode;
  meta: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${
        className || ""
      } flex flex-col items-center w-full justify-center space-y-4 text-base lg:text-lg py-8`}
    >
      {icon}
      {meta}
    </div>
  );
};

export default About;
