interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers_url: string;
  following_url: string;
  followers: number;
  following: number;
  type: string;
}

interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

export type { GitHubUser, SearchResponse };
