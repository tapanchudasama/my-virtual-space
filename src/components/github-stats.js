import React, { useEffect, useCallback } from "react";
import {
  Box,
  Text,
  Stack,
  Grid,
  GridItem,
  Icon,
  Container,
} from "@chakra-ui/react";
import { useStaticQuery, graphql } from "gatsby";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { GoRepo, GoGitMerge, GoCode } from "react-icons/go";

const GithubStats = () => {
  const [majorityLanguage, setMajorityLanguage] = React.useState("");
  const [majorityLanguagePercent, setMajorityLanguagePercent] =
    React.useState("");
  const { githubData } = useStaticQuery(graphql`
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
  const { data } = githubData;
  const { user } = data;

  const findMajorityLanguage = useCallback(() => {
    let totalLanguages = 0;
    let majorityLanguage = "";
    const map = new Map();
    user.repositories.edges.forEach(({ node }) => {
      if (node.languages.totalCount) {
        totalLanguages += node.languages.totalCount;
        node.languages.edges.forEach(({ node }) => {
          map.set(node.name, map.has(node.name) ? map.get(node.name) + 1 : 1);
        });
      }
    });

    let MIN_VALUE = 0;
    for (const [k, v] of map) {
      if (v > MIN_VALUE) {
        MIN_VALUE = v;
        majorityLanguage = k;
      }
    }

    return [majorityLanguage, map.get(majorityLanguage) / totalLanguages];
  }, [user.repositories.edges]);

  useEffect(() => {
    const l = findMajorityLanguage();
    setMajorityLanguage(l[0]);
    setMajorityLanguagePercent(l[1]);
  }, [findMajorityLanguage]);

  const bgColor = useColorModeValue("blue.200", "gray.700");

  return (
    <Box width="100%" backgroundColor={bgColor} py={8} my={8}>
      <Container maxWidth="6xl">
        <Grid
          templateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(3,1fr)"]}
          justifyItems="center"
          alignItems="center"
          gap={4}
          fontSize={["xs", "xs", "sm"]}
        >
          <GridItem>
            <Stack
              width="100%"
              alignItems="center"
              textAlign="center"
              spacing={[2, 4]}
              direction="column"
            >
              <Icon as={GoRepo} w={["6", "8"]} h={["6", "8"]} />
              <Stack justifyContent="space-between" spacing={4} direction="row">
                <Text>Total Repositories</Text>
                <Text fontWeight="bold">{user.repositories.totalCount}</Text>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack
              width="100%"
              alignItems="center"
              textAlign="center"
              spacing={4}
              direction="column"
            >
              <Icon as={GoGitMerge} w={["6", "8"]} h={["6", "8"]} />
              <Stack justifyContent="space-between" spacing={4} direction="row">
                <Text>Open Source Contributions</Text>
                <Text fontWeight="bold">
                  {user.repositoriesContributedTo.totalCount}
                </Text>
              </Stack>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack
              width="100%"
              alignItems="center"
              textAlign="center"
              spacing={4}
              direction="column"
            >
              <Icon as={GoCode} w={["6", "8"]} h={["6", "8"]} />
              <Stack justifyContent="space-between" spacing={4} direction="row">
                <Text>Most used Language</Text>
                <Text fontWeight="bold">
                  {majorityLanguage} (
                  {Math.round(majorityLanguagePercent * 100)}%)
                </Text>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default GithubStats;
