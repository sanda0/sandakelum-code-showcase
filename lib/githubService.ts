// lib/githubService.ts

import {
  GitHubPinnedRepository,
  GitHubPinnedItemsData,
  GitHubRepository,
  GitHubUserRepositoriesGraphQLResponse,
  FetchPublicRepositoriesAndLanguagesResult,
  // Add other specific types from 'types/github.ts' if they are directly returned or used here
} from '../types/github'; // Adjust the path based on your file structure

interface FetchPinnedReposResult {
  pinnedRepos: GitHubPinnedRepository[];
  allUniqueLanguages: string[];
}

// The GraphQL query remains the same
const GITHUB_PINNED_REPOS_QUERY = `
  query GetPinnedRepositoriesWithLanguages($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        totalCount
        edges {
          node {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              owner {
                login
              }
              openGraphImageUrl
              primaryLanguage {
                name
                color
              }
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchPinnedRepositories(
  username: string,
  pat: string
): Promise<FetchPinnedReposResult> {
  if (!username || !pat) {
    throw new Error('GitHub username or PAT is missing for fetchPinnedRepositories.');
  }

  const variables = { username };

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${pat}`,
    },
    body: JSON.stringify({ query: GITHUB_PINNED_REPOS_QUERY, variables }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`GitHub API responded with ${response.status}: ${errorBody}`);
    throw new Error(`GitHub API responded with ${response.status}. Check server logs for details.`);
  }

  const result: GitHubPinnedItemsData = await response.json();

  if (result.errors) {
    console.error('GitHub API Errors:', result.errors);
    throw new Error('Failed to fetch pinned repositories due to API errors. Check server logs.');
  }

  if (!result.data || !result.data.user || !result.data.user.pinnedItems) {
    console.error('GitHub API response does not match expected structure:', result);
    throw new Error('Invalid data structure received from GitHub API.');
  }

  const pinnedRepos: GitHubPinnedRepository[] = result.data.user.pinnedItems.edges.map(
    (edge) => edge.node
  );

  // Processing languages
  const allLanguagesAcrossProjects: string[] = [];
  pinnedRepos.forEach(repo => {
    if (repo.languages && repo.languages.edges) {
      repo.languages.edges.forEach(langEdge => {
        allLanguagesAcrossProjects.push(langEdge.node.name);
      });
    }
  });

  const allUniqueLanguages = Array.from(new Set(allLanguagesAcrossProjects));

  return {
    pinnedRepos,
    allUniqueLanguages,
  };
}




/**
 * Fetches all public repositories for a given GitHub username and extracts all unique
 * primary programming languages from these repositories.
 *
 * @param username The GitHub username.
 * @param pat A GitHub Personal Access Token (PAT) with 'public_repo' scope.
 * @returns A Promise resolving to an object containing an array of repositories
 * and an array of unique programming language names.
 */
export async function fetchAllPublicRepositoriesAndLanguages(
  username: string,
  pat: string
): Promise<FetchPublicRepositoriesAndLanguagesResult> {
  if (!username || !pat) {
    throw new Error(
      'GitHub username or PAT is missing for fetchAllPublicRepositoriesAndLanguages.'
    );
  }

  // The GraphQL query remains the same as it already fetches primaryLanguage
  const GITHUB_PUBLIC_REPOS_QUERY = `
    query GetAllPublicRepositories($username: String!, $cursor: String) {
      user(login: $username) {
        repositories(first: 100, privacy: PUBLIC, after: $cursor) {
          edges {
            node {
              name
              description
              url
              stargazerCount
              forkCount
              owner {
                login
              }
              openGraphImageUrl
              primaryLanguage {
                name
                color
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  const repositories: GitHubRepository[] = [];
  const uniqueLanguagesSet = new Set<string>(); // To store unique language names
  let cursor: string | null = null;

  do {
    const variables = { username, cursor };

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${pat}`,
      },
      body: JSON.stringify({ query: GITHUB_PUBLIC_REPOS_QUERY, variables }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `GitHub API responded with ${response.status}: ${errorBody}`
      );
      throw new Error(
        `GitHub API responded with ${response.status}. Check server logs for details.`
      );
    }

    const result: GitHubUserRepositoriesGraphQLResponse = await response.json();

    if (result.errors) {
      console.error('GitHub API Errors:', result.errors);
      throw new Error(
        'Failed to fetch public repositories due to API errors. Check server logs.'
      );
    }

    // Validate the structure of the response
    if (
      !result.data ||
      !result.data.user || // User might be null (e.g., user not found)
      !result.data.user.repositories // Repositories object might be missing
    ) {
       // Handle case where user is explicitly null (e.g. user not found)
      if (result.data && result.data.user === null) {
        console.warn(`GitHub user "${username}" not found or has no accessible public repositories.`);
        // Return empty results for a user not found or with no repos, instead of throwing an error.
        // If throwing is preferred, the original error can be reinstated.
        return { repositories: [], uniqueLanguages: [] };
      }
      console.error(
        'GitHub API response does not match expected structure:',
        result
      );
      throw new Error('Invalid data structure received from GitHub API.');
    }

    const repoEdges = result.data.user.repositories.edges;

    // Process repositories and extract languages
    if (repoEdges) {
        for (const edge of repoEdges) {
            // Ensure edge and edge.node are valid before processing
            if (edge && edge.node) {
                repositories.push(edge.node);
                if (edge.node.primaryLanguage && edge.node.primaryLanguage.name) {
                    uniqueLanguagesSet.add(edge.node.primaryLanguage.name);
                }
            }
        }
    }
    
    const pageInfo = result.data.user.repositories.pageInfo;
    cursor = pageInfo.hasNextPage ? pageInfo.endCursor : null;
  } while (cursor);

  return {
    repositories,
    uniqueLanguages: Array.from(uniqueLanguagesSet),
  };
}