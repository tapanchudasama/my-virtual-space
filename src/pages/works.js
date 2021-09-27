import React, { useEffect } from "react";
import { Text, Box, Flex, Container, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

import { letter, sentence } from "../components/about";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HEADING = "all my works";

const Works = () => {
  const value = useColorModeValue("gray.100");

  const headingAnimation = useAnimation();
  const contentAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      await headingAnimation.start("visible");
      await contentAnimation.start("visible");
    }
    sequence();
  }, [contentAnimation, headingAnimation]);

  return (
    <Box backgroundColor={value}>
      <Container maxWidth="6xl">
        <MotionHeading
          initial="hidden"
          display="flex"
          variants={sentence}
          animate={headingAnimation}
          fontSize={["3xl", "4xl", "5xl"]}
          py={8}
        >
          {HEADING.split(" ").map((char, index) => {
            return (
              <MotionText key={char + "-" + index} pr="4" variants={letter}>
                {char}
              </MotionText>
            );
          })}
        </MotionHeading>
      </Container>
    </Box>
  );
};

export default Works;
