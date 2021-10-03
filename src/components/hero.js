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

const MotionBox = motion(Box);

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
  const iconsAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      await iconsAnimation.start("visible");
    }
    sequence();
  }, [iconsAnimation]);

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
        <Heading fontSize={["4xl", "5xl", "6xl"]}>{name}</Heading>
        <Text fontSize={["2xl", "3xl"]}>{description}</Text>
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
        <Stack pt={["4", "8"]} direction="row" spacing={4}>
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
        </Stack>
      </Flex>
    </Container>
  );
};

export default Hero;
