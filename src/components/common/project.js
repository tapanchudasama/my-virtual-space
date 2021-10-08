import { useColorModeValue } from "@chakra-ui/color-mode";
import { ExternalLinkIcon, Icon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiCodeAlt } from "react-icons/bi";

const Project = ({ node }) => {
  const hoverColor = useColorModeValue("blue.800", "whiteAlpha.600");

  return (
    <Stack width="100%" direction="column">
      <Heading fontSize={["md", "lg"]}>{node.frontmatter.title}</Heading>
      <Stack direction="row">
        <Text fontSize={["sm", "md"]}>
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </Text>
      </Stack>
      <Stack
        alignItems="baseline"
        direction="row"
        justifyContent="space-between"
        width="100%"
      >
        <Flex flexWrap="wrap" alignItems="center">
          {node.frontmatter.techs.map((t, index) => (
            <Tag size="sm" mt={2} ml={index > 0 ? 2 : 0}>
              {t}
            </Tag>
          ))}
        </Flex>
        <Stack direction="row" spacing={4} alignItems="center">
          {node.frontmatter.repo_link_backend && (
            <ChakraLink
              _hover={{ color: hoverColor }}
              href={node.frontmatter.repo_link_backend}
              cursor="pointer"
              isExternal
            >
              <Icon as={BiCodeAlt} w="6" h="6" />
            </ChakraLink>
          )}
          {node.frontmatter.repo_link_frontend && (
            <ChakraLink
              _hover={{ color: hoverColor }}
              href={node.frontmatter.repo_link_frontend}
              cursor="pointer"
              isExternal
            >
              <Icon as={BiCodeAlt} w="6" h="6" />
            </ChakraLink>
          )}
          <ChakraLink
            href={node.frontmatter.demo_link}
            _hover={{ color: hoverColor }}
            cursor="pointer"
            isExternal
          >
            <ExternalLinkIcon w={5} h={5} />
          </ChakraLink>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Project;
