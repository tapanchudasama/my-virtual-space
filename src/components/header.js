import React from "react";
import {
  Stack,
  Box,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Navigation from "./navigation";
import { AnimatePresence } from "framer-motion";
import ToggleTheme from "./ToggleTheme";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { Link } from "gatsby";

const Header = () => {
  const { name } = useSiteMetadata();

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
        <Modal isOpen={showNavigation} size="full">
          <ModalOverlay />
          <ModalContent>
            <Navigation setShowNavigation={setShowNavigation} />
          </ModalContent>
        </Modal>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Header;
