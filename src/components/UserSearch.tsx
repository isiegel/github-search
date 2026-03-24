import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useGitHubSearch from '../hooks/useGitHubSearch';
import UserList from './UserList';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [hasSearched, setHasSearched] = useState(false);
  const { users, loading, error, searchUsers, clearSearch } = useGitHubSearch();

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setHasSearched(true);
      setLastQuery(debouncedQuery);
      searchUsers(debouncedQuery);
    } else {
      setHasSearched(false);
      clearSearch();
    }
  }, [debouncedQuery, searchUsers, clearSearch]);

  const handleClear = () => {
    setQuery('');
    setHasSearched(false);
    clearSearch();
  };

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
      searchUsers(debouncedQuery);
    }
  };

  return (
    <div>
      <h2 className="mt-4">GitHub User Search</h2>
      <p className="text-gray-600 text-center p-2">
        Search for GitHub users and view their profiles
      </p>
      <form onSubmit={handleSearch} className="mt-6">
        <div className="relative inline-block">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lastQuery || "Enter GitHub username"}
            className="px-4 py-2 pr-8"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-(--accent) text-white font-medium rounded hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          Search
        </button>
      </form>
      <UserList
        users={users}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
      />
    </div>
  );
};

export default UserSearch;
