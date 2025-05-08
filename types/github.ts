// types/github.ts

export interface GitHubLanguageNode { // Renamed for clarity, was GitHubPrimaryLanguage
  name: string;
  color: string;
}

export interface GitHubLanguageEdge {
  size: number;
  node: GitHubLanguageNode;
}

export interface GitHubLanguageConnection {
  edges: GitHubLanguageEdge[];
  // totalSize?: number; // Uncomment if you query and need it
  // totalCount?: number; // Uncomment if you query and need it
}

export interface GitHubRepositoryOwner {
  login: string;
}

export interface GitHubPinnedRepository {
  name: string;
  description: string | null;
  url:string;
  stargazerCount: number;
  forkCount: number;
  owner: GitHubRepositoryOwner;
  openGraphImageUrl: string;
  primaryLanguage: GitHubLanguageNode | null; // This is still for the single primary one
  languages: GitHubLanguageConnection;       // This is for the list of languages
}

export interface GitHubPinnedItemEdge {
  node: GitHubPinnedRepository;
}

// GitHubPinnedItemsData and PinnedReposProps remain the same as before
// if PinnedReposProps still just passes the array of GitHubPinnedRepository
export interface GitHubPinnedItemsData {
  data: { // Corrected: data is the top-level key from GitHub API response for successful queries
    user: {
      pinnedItems: {
        totalCount: number;
        edges: GitHubPinnedItemEdge[];
      };
    };
  }
  errors?: any[]; // Optional: for handling GraphQL errors
}


export interface PinnedReposProps {
  pinnedRepos: GitHubPinnedRepository[];
  allUniqueLanguages?: string[]; // Optional: if you pass the unique list as a prop
  error?: string;
}



// ---------------------------------------------------------------------------------
// TYPE DEFINITIONS (assuming these are defined, or you can define them as below)
// ---------------------------------------------------------------------------------

/**
 * Represents the primary programming language of a GitHub repository.
 */
export interface GitHubPrimaryLanguage {
  name: string;
  color: string;
}

/**
 * Represents the owner of a GitHub repository.
 */
export interface GitHubOwner {
  login: string;
}

/**
 * Represents a GitHub repository, similar to the original GitHubPinnedRepository.
 * Ensure this type matches the fields in your GraphQL query.
 */
export interface GitHubRepository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  owner: GitHubOwner;
  openGraphImageUrl: string;
  primaryLanguage: GitHubPrimaryLanguage | null; // primaryLanguage can be null
}

/**
 * Represents the structure of the data returned by the GitHub GraphQL API for user repositories.
 * This replaces the placeholder `GitHubPinnedItemsData` if its structure wasn't fully defined.
 */
export interface GitHubUserRepositoriesGraphQLResponse {
  data?: {
    user?: {
      repositories: {
        edges: Array<{ node: GitHubRepository }>;
        pageInfo: {
          endCursor: string | null;
          hasNextPage: boolean;
        };
      };
    } | null; // User can be null if not found or has no accessible data
  };
  errors?: Array<{ message: string; [key: string]: any }>; // For GraphQL errors
}

/**
 * The new return type for the function, including repositories and unique languages.
 */
export interface FetchPublicRepositoriesAndLanguagesResult {
  repositories: GitHubRepository[];
  uniqueLanguages: string[];
}
