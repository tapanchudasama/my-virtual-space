import { useColorMode } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icons";
import { Box, HStack } from "@chakra-ui/layout";
import React from "react";
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
