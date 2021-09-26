import React, { useEffect } from "react";
import { Heading, Flex, Text, Container, Box } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { sentence, letter } from "../components/about";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionBox = motion(Box);

const Hero = () => {
  const { name, description } = useSiteMetadata();

  const nameAnimation = useAnimation();
  const descriptionAnimation = useAnimation();

  useEffect(() => {
    async function sequence() {
      await nameAnimation.start("visible");
      await descriptionAnimation.start("visible");
    }
    sequence();
  }, [nameAnimation, descriptionAnimation]);

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
      </Flex>
    </Container>
  );
};

export default Hero;
