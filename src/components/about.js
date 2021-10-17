import { motion, useAnimation } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import {
  FaHeadphones,
  FaLightbulb,
  FaNetworkWired,
  FaStarOfLife,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import SectionHeading from "../components/common/SectionHeading";
import SpotifyRecentlyPlayed from "./spotify-recently-played";

const MotionSectionHeading = motion(SectionHeading);

const HEADING = "some things about me";

export const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      damping: 5,
      duration: 0.5,
    },
  },
};

const About = () => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/sections/about/" } }
      ) {
        nodes {
          frontmatter {
            mbti_type
            hobbies
            about_image {
              childImageSharp {
                gatsbyImageData(
                  width: 300
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  `);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const headingAnimation = useAnimation();
  const contentAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      if (inView) {
        await headingAnimation.start("visible");
        await contentAnimation.start("visible");
      }
    }
    sequence();
  }, [inView, contentAnimation, headingAnimation]);

  const { allMarkdownRemark } = data;
  const { frontmatter } = allMarkdownRemark.nodes[0];
  const image = getImage(frontmatter.about_image);

  return (
    <div className="container mx-auto px-4 lg:px-16" ref={ref}>
      <MotionSectionHeading
        initial="hidden"
        display="flex"
        variants={sentence}
        animate={headingAnimation}
      >
        {HEADING.split(" ").map((char, index) => {
          return (
            <motion.p key={char + "-" + index} variants={letter}>
              {char}
            </motion.p>
          );
        })}
      </MotionSectionHeading>

      <motion.div
        className="flex flex-col py-4"
        initial="hidden"
        variants={letter}
        animate={contentAnimation}
      >
        <div className="self-center w-40 md:w-60 lg:w-80">
          <GatsbyImage
            image={image}
            style={{ borderRadius: "50%" }}
            alt="my-picture"
          />
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-3 pt-8 justify-center items-start gap-8 text-sm lg:text-md"
          pt="8"
        >
          <AboutMeta
            icon={<FaStarOfLife className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <p>
                I enjoy{" "}
                {frontmatter.hobbies.map((h, index) => {
                  return (
                    <p className="inline font-bold">
                      {h}
                      {index === frontmatter.hobbies.length - 1 ? "" : ","}{" "}
                    </p>
                  );
                })}
                . Doing a Europe tour is one of the items in my bucket list.
              </p>
            }
          />
          <AboutMeta
            icon={<FaNetworkWired className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <p className="text-center">
                My{" "}
                <a
                  className="font-bold"
                  fontWeight="bold"
                  href="https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator"
                >
                  Myers-Briggs Type Indicator (MBTI)
                </a>{" "}
                is{" "}
                <a
                  className="font-bold"
                  href="https://www.16personalities.com/intj-personality?utm_source=email&utm_medium=welcome-architect&utm_campaign=description"
                >
                  {frontmatter.mbti_type}.
                </a>{" "}
                (introverted, intuitive, thinking, and judging)
                <p>
                  You also can take the test yourself at{" "}
                  <a
                    className="font-bold"
                    href="http://www.16personalities.com/"
                  >
                    16personalities.com
                  </a>
                </p>
              </p>
            }
          />

          <AboutMeta
            icon={<FaHeadphones className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <>
                <p className="text-center">Currently I am listening to:</p>
                <SpotifyRecentlyPlayed />
              </>
            }
          />
          <AboutMeta
            icon={<FaLightbulb className="w-6 h-6 lg:w-8 lg:h-8" />}
            meta={
              <p className="text-center">
                I enjoy talking about intellectually stimulating topics, be it
                any field. Currently I am trying to learn about{" "}
                <strong>stock markets</strong> and <strong>finance</strong>{" "}
                along with software engineering, of course.
              </p>
            }
          />
        </div>
      </motion.div>
    </div>
  );
};

const AboutMeta = ({ icon, meta }) => {
  return (
    <div className="flex flex-col items-center w-full justify-center space-y-4">
      {icon}
      {meta}
    </div>
  );
};

export default About;
