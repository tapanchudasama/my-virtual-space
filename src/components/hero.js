import React, { useEffect } from "react";
import {
  Heading,
  Flex,
  Text,
  Container,
  Box,
  Stack,
  Link,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { Icon } from "@chakra-ui/react";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaReddit,
  FaEnvelope,
} from "react-icons/fa";
import { useStaticQuery, graphql } from "gatsby";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { sentence, letter } from "../components/about";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionBox = motion(Box);
const MotionStack = motion(Stack);

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
  const nameAnimation = useAnimation();
  const descriptionAnimation = useAnimation();
  const iconsAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      await nameAnimation.start("visible");
      await descriptionAnimation.start("visible");
      await iconsAnimation.start("visible");
    }
    sequence();
  }, [nameAnimation, descriptionAnimation, iconsAnimation]);

  return (
    <Container maxWidth="6xl" position="relative">
      <Flex
        height="100vh"
        width="100%"
        flexGrow="1"
        direction="column"
        justifyContent="center"
      >
        <Text fontSize={["lg", "xl", "2xl"]}>hi, i am</Text>
        <MotionHeading
          display="flex"
          initial="hidden"
          animate={nameAnimation}
          variants={sentence}
          fontSize={["4xl", "5xl", "6xl"]}
        >
          {name.split(" ").map((char, index) => {
            return (
              <MotionText pr="4" key={char + "-" + index} variants={letter}>
                {char}
              </MotionText>
            );
          })}
        </MotionHeading>
        <MotionText
          fontSize={["2xl", "3xl"]}
          display="flex"
          initial="hidden"
          animate={descriptionAnimation}
          variants={sentence}
        >
          {description.split(" ").map((char, index) => {
            return (
              <MotionText pr="2" key={char + "-" + index} variants={letter}>
                {char}
              </MotionText>
            );
          })}
        </MotionText>
        <Box
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="start"
          left="50%"
          bottom="24"
          border="1px"
          borderRadius="16"
          width={5}
          height={8}
        >
          <MotionBox
            backgroundColor="red.300"
            w={1}
            h={2}
            borderRadius="50%"
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </Box>
        <MotionStack
          pt={["4", "8"]}
          direction="row"
          spacing={4}
          initial="hidden"
          animate={iconsAnimation}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          {twitter && (
            <Link key="twitter" href={twitter} target="_blank">
              <Icon as={FaTwitter} w={["6", "8"]} h={["6", "8"]} />
            </Link>
          )}
          {linkedin && (
            <Link key="linkedin" href={linkedin} target="_blank">
              <Icon as={FaLinkedin} w={["6", "8"]} h={["6", "8"]} />
            </Link>
          )}
          {github && (
            <Link key="github" href={github} target="_blank">
              <Icon as={FaGithub} w={["6", "8"]} h={["6", "8"]} />
            </Link>
          )}
          {reddit && (
            <Link key="reddit" href={reddit} target="_blank">
              <Icon as={FaReddit} w={["6", "8"]} h={["6", "8"]} />
            </Link>
          )}

          {mail && (
            <Link key="mail" href={`mailto:${mail}`} target="_blank">
              <Icon as={FaEnvelope} w={["6", "8"]} h={["6", "8"]} />
            </Link>
          )}
        </MotionStack>
      </Flex>
    </Container>
  );
};

export default Hero;
