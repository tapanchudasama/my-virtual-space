import React from "react";
import { Flex, Heading, Box, Container, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CloseIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link } from "gatsby";

const MotionBox = motion(Box);

export const borderVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const Navigation = ({ setShowNavigation }) => {
  const value = useColorModeValue("gray.100");
  const borderColor = useColorModeValue("green.800", "yellow.200");

  return (
    <Box backgroundColor={value} overflow="hidden">
      <Container maxWidth="6xl">
        <Flex direction="column" height="100vh">
          <Flex alignItems="center" justifyContent="flex-end" py="8">
            <Box onClick={() => setShowNavigation(false)}>
              <CloseIcon w={["4", "8"]} h={["4", "8"]} cursor="pointer" />
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
                  <Link to={`${label}`}>
                    <Heading fontSize={["3xl", "4xl", "5xl"]}>{label}</Heading>
                  </Link>
                  <MotionBox
                    borderBottom="1px"
                    variants={borderVariants}
                    borderColor={borderColor}
                  />
                </MotionBox>
              ))}
            </VStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navigation;
