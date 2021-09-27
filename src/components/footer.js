import React from "react";
import { Flex, Box, Text, Container } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import ToggleTheme from "./ToggleTheme";

const Footer = () => {
  const value = useColorModeValue("teal.200", "gray.700");
  return (
    <Box backgroundColor={value} p="4">
      <Container maxWidth="6xl">
        <Flex as="footer" alignItems="center" justifyContent="space-between">
          <Box>
            <Text>Copyright © Tapan Chudasama</Text>
          </Box>
          <Box as="div" justifySelf="end">
            <ToggleTheme />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
export default Footer;
