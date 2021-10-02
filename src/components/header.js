import React from "react";
import {
  Stack,
  Box,
  Container,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Navigation from "./navigation";
import { AnimatePresence } from "framer-motion";
import ToggleTheme from "./ToggleTheme";
import { Link } from "gatsby";

const Header = () => {
  const [showNavigation, setShowNavigation] = React.useState(false);
  return (
    <React.Fragment>
      <Container maxWidth="6xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          pt="6"
        >
          <Link to="/">
            <Heading fontSize={["lg", "xl", "2xl"]}>home</Heading>
          </Link>
          <Stack direction="row" spacing={8} alignItems="center">
            <Box as="div" justifySelf="end">
              <ToggleTheme />
            </Box>
            <Box onClick={() => setShowNavigation(true)}>
              <HamburgerIcon w={["6", "8"]} h={["6", "8"]} cursor="pointer" />
            </Box>
          </Stack>
        </Stack>
      </Container>
      <AnimatePresence exitBeforeEnter>
        <Drawer isOpen={showNavigation} size={["md"]}>
          <DrawerOverlay />
          <DrawerContent>
            <Navigation setShowNavigation={setShowNavigation} />
          </DrawerContent>
        </Drawer>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Header;
