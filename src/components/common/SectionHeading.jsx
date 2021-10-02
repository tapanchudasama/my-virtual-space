import React from "react";
import { Heading } from "@chakra-ui/react";

const SectionHeading = ({ children }) => {
  return (
    <Heading display="flex" fontSize={["2xl", "3xl", "4xl"]} py={8}>
      {children}
    </Heading>
  );
};

export default SectionHeading;
