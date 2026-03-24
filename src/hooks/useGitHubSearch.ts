import { useCallback, useState } from "react";
import type { GitHubUser, SearchResponse } from "../types/github";

const useGitHubSearch = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data: SearchResponse = await response.json();
      setUsers(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setUsers([]);
    setError(null);
  }, []);

  return { users, loading, error, searchUsers, clearSearch };
}

export default useGitHubSearch;
