import {
  Switch,
  useColorMode,
  Flex,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function ThemeToggle() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack space="4">
      <Box>
        <Switch
          size="lg"
          onChange={() => toggleColorMode()}
          colorScheme="teal"
          isChecked={colorMode === "dark"}
        />
      </Box>
      <Flex w="16" h="16" alignItems="center" justifyItems="center">
        {colorMode === "dark" ? (
          <Text fontWeight="bold">Dark</Text>
        ) : (
          <Text fontWeight="bold">Light</Text>
        )}
      </Flex>
    </HStack>
  );
}
