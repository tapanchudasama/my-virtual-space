import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, Box, HStack, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function ThemeToggle() {
  const { toggleColorMode, colorMode } = useColorMode();
  const iconColor = useColorModeValue("blue.200");
  return (
    <HStack space="4">
      <Box>
        <IconButton
          color={iconColor}
          onClick={toggleColorMode}
          aria-label="change-theme"
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        />
      </Box>
    </HStack>
  );
}
