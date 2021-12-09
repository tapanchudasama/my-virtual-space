import { motion } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";
import { useSiteMetadata } from "../hooks/use-site-metadata";

const Hero = () => {
  const { allHeroJson } = useStaticQuery(
    graphql`
      query SocialMediaQuery {
        allHeroJson {
          edges {
            node {
              linkedin
              mail
              twitter
              reddit
              github
            }
          }
        }
      }
    `
  );
  const { siteMetadata } = useSiteMetadata();
  const { name, description } = siteMetadata;
  const { twitter, mail, reddit, github, linkedin } = allHeroJson.edges[0].node;

  return (
    <main className="container relative mx-auto px-4 lg:px-16">
      <div className="flex flex-col w-full h-screen flex-1 justify-center">
        <p className="text-xl md:text-2xl xl:text-3xl">hi, i am</p>
        <div className="space-y-3">
          <p className="text-5xl md:text-6xl xl:text-8xl leading-tight font-bold">
            {name}
          </p>
          <p className="text-2xl md:text-3xl xl:text-4xl">{description}</p>
          <div className="flex space-x-6 py-2">
            {twitter && (
              <a
                aria-label="Twitter"
                rel="noreferrer"
                key="twitter"
                href={twitter}
                target="_blank"
              >
                <FaTwitter className="w-8 h-8 xl:w-10 xl:h-10" />
              </a>
            )}
            {linkedin && (
              <a
                aria-label="LinkedIn"
                rel="noreferrer"
                key="linkedin"
                href={linkedin}
                target="_blank"
              >
                <FaLinkedin
                  as={FaLinkedin}
                  className="w-8 h-8 xl:w-10 xl:h-10"
                />
              </a>
            )}
            {github && (
              <a
                aria-label="GitHub"
                rel="noreferrer"
                key="github"
                href={github}
                target="_blank"
              >
                <FaGithub className="w-8 h-8 xl:w-10 xl:h-10" />
              </a>
            )}
            {reddit && (
              <a
                aria-label="Reddit"
                rel="noreferrer"
                key="reddit"
                href={reddit}
                target="_blank"
              >
                <FaReddit className="w-8 h-8 xl:w-10 xl:h-10" />
              </a>
            )}

            {mail && (
              <a
                aria-label="mail"
                rel="noreferrer"
                key="mail"
                href={`mailto:${mail}`}
                target="_blank"
              >
                <FaEnvelope className="w-8 h-8 xl:w-10 xl:h-10" />
              </a>
            )}
          </div>
        </div>
        <div className="absolute hidden lg:flex justify-center items-start left-1/2 bottom-32 border rounded-2xl w-5 h-8 border-white">
          <motion.div
            className="w-1 h-2 rounded-full bg-red-300"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
