import React from "react";
import { useColorMode, Box, HStack, Icon } from "@chakra-ui/react";
import { ImContrast } from "react-icons/im";

export default function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  return (
    <HStack space="4">
      <Box cursor="pointer" onClick={toggleColorMode}>
        <Icon as={ImContrast} />
      </Box>
    </HStack>
  );
}
