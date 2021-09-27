import React from "react";
import { Flex, Heading, Box, Container, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CloseIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link } from "gatsby";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

export const borderVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const Navigation = () => {
  const value = useColorModeValue("gray.100");
  const borderColor = useColorModeValue("green.800", "yellow.200");

  return (
    <Box backgroundColor={value}>
      <Container maxWidth="6xl" overflow="hidden">
        <MotionFlex
          direction="column"
          height="100vh"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            mass: 0.35,
            stiffness: 75,
            duration: 0.5,
          }}
        >
          <Flex alignItems="center" justifyContent="flex-end" py="8">
            <Box>
              <Link to="/">
                <CloseIcon w="8" h="8" cursor="pointer" />
              </Link>
            </Box>
          </Flex>
          <Flex
            width="100%"
            height="100%"
            alignItems="center"
            direction="column"
            justifyContent="center"
          >
            <VStack spacing={4}>
              {["readings", "writings"].map((label, index) => (
                <MotionBox
                  position="relative"
                  initial="hidden"
                  whileHover="visible"
                  key={label + "-" + index}
                  cursor="pointer"
                >
                  <Heading fontSize={["3xl", "4xl", "5xl"]}>{label}</Heading>
                  <MotionBox
                    borderBottom="1px"
                    variants={borderVariants}
                    borderColor={borderColor}
                  />
                </MotionBox>
              ))}
            </VStack>
          </Flex>
        </MotionFlex>
      </Container>
    </Box>
  );
};

export default Navigation;
