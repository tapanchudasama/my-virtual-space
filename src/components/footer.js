import React from "react";
import { Flex, Box, Text, Container, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FaHeart } from "react-icons/fa";
import { useSiteMetadata } from "../hooks/use-site-metadata";

const Footer = () => {
  const value = useColorModeValue("blue.300", "gray.700");
  const { siteMetadata } = useSiteMetadata();
  return (
    <Box backgroundColor={value} p={4}>
      <Container maxWidth="6xl">
        <Flex as="footer" alignItems="center" justifyContent="space-between">
          <Flex alignItems="baseline">
            <Text fontSize={["xs", "xs", "sm"]}>
              Made with <Icon as={FaHeart} color="red.500" /> by{" "}
              <Text
                display="inline"
                textTransform="capitalize"
                fontWeight="bold"
              >
                {siteMetadata.name}
              </Text>
            </Text>
          </Flex>
          <Box w={200}>
            <a
              href="https://www.buymeacoffee.com/tapanchudasama"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                width="100%"
                height="100%"
              ></img>
            </a>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
export default Footer;
