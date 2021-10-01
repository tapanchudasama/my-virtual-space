import React from "react";
import { Flex, Box, Text, Container } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const Footer = () => {
  const value = useColorModeValue("blue.300", "gray.700");
  return (
    <Box backgroundColor={value} p={8}>
      <Container maxWidth="6xl">
        <Flex as="footer" alignItems="center" justifyContent="space-between">
          <Box>
            <Text>Copyright © Tapan Chudasama</Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
export default Footer;
