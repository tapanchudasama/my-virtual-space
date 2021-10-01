import React from "react";
import { Box, Flex, Text, Heading, Stack } from "@chakra-ui/react";
import { useStaticQuery, graphql } from "gatsby";
import { useColorModeValue } from "@chakra-ui/color-mode";

const GithubStats = () => {
  const queryData = useStaticQuery(graphql`
    query MyQuery {
      githubData {
        data {
          user {
            contributionsCollection {
              contributionYears
              hasAnyContributions
            }
            createdAt
            repositoriesContributedTo {
              totalCount
            }
            repositories {
              edges {
                node {
                  name
                  stargazers {
                    totalCount
                  }
                  languages {
                    totalCount
                    edges {
                      node {
                        color
                        name
                      }
                      size
                    }
                  }
                }
              }
              totalCount
            }
          }
        }
      }
    }
  `);

  const { githubData } = queryData;
  const { data } = githubData;
  const { user } = data;
  const bgColor = useColorModeValue("blue.200", "gray.700");

  return (
    <Box width="100%" backgroundColor={bgColor} py={8} my={8}>
      <Stack alignItems="baseline" spacing={4} direction="row">
        <Text fontWeight="bold" fontSize={["sm", "md", "lg"]}>
          Total Repositories
        </Text>
        <Text>{user.repositories.totalCount}</Text>
      </Stack>
    </Box>
  );
};

export default GithubStats;
