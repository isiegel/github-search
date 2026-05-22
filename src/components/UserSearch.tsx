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
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setHasSearched(true);
      setLastQuery(trimmedQuery);
      searchUsers(trimmedQuery);
    }
  };

  return (
    <div className="px-6 pb-12">
      <div className="flex flex-col items-center mt-10">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-sm"
          style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-9 h-9"
            style={{ color: 'var(--accent)' }}
            aria-hidden="true"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </div>
        <h2 className="mt-0">GitHub User Search</h2>
        <p className="text-center mt-2" style={{ color: 'var(--text)' }}>
          Search for GitHub users and view their profiles
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        <div
          className="relative flex items-center w-full max-w-md rounded-lg shadow-sm focus-within:shadow-md transition-shadow"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 ml-3 opacity-60"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lastQuery || "Enter GitHub username"}
            className="flex-1 bg-transparent px-3 py-2.5 outline-none placeholder:opacity-60"
            style={{ color: 'var(--text-h)' }}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 w-6 h-6 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 font-medium rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50 disabled:hover:translate-y-0"
          style={{
            background: 'var(--accent)',
            color: 'var(--bg)',
          }}
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
