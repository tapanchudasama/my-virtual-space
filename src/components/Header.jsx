import React from "react";
import { Flex, Box, Container } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  return (
    <Container maxWidth="6xl">
      <Flex alignItems="center" justifyContent="flex-end" pt="6">
        <Box>
          <HamburgerIcon w="10" h="10" cursor="pointer" />
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
