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
        <p className="text-base lg:text-lg">hi, i am</p>
        <div className="space-y-2">
          <p className="text-3xl md:text-4xl lg:text-6xl leading-tight font-bold">
            {name}
          </p>
          <p className="text-lg md:text-xl lg:text-3xl">{description}</p>
          <div className="flex space-x-4 py-2">
            {twitter && (
              <a
                aria-label="Twitter"
                rel="noreferrer"
                key="twitter"
                href={twitter}
                target="_blank"
              >
                <FaTwitter className="w-6 h-6 lg:w-8 lg:h-8" />
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
                <FaLinkedin as={FaLinkedin} className="w-6 h-6 lg:w-8 lg:h-8" />
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
                <FaGithub className="w-6 h-6 lg:w-8 lg:h-8" />
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
                <FaReddit className="w-6 h-6 lg:w-8 lg:h-8" />
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
                <FaEnvelope className="w-6 h-6 lg:w-8 lg:h-8" />
              </a>
            )}
          </div>
        </div>
        <div className="absolute hidden lg:flex justify-center items-start left-1/2 bottom-28 border rounded-2xl w-5 h-8 border-white">
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
