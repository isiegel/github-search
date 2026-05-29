import { useState } from 'react';
import type { GitHubUser } from '../types/github';
import UserDetails from './UserDetails';

interface UserListProps {
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  query: string;
}

function UserList({ users, loading, error, hasSearched, query }: UserListProps) {
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl p-5 flex flex-col items-center"
            style={{
              background: 'var(--social-bg)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              className="w-20 h-20 rounded-full mb-3"
              style={{
                background:
                  'linear-gradient(90deg, var(--border) 0px, var(--code-bg) 200px, var(--border) 400px)',
                backgroundSize: '800px 100%',
                animation: 'shimmer 1.4s linear infinite',
              }}
            />
            <div
              className="h-4 w-24 rounded mb-2"
              style={{
                background:
                  'linear-gradient(90deg, var(--border) 0px, var(--code-bg) 200px, var(--border) 400px)',
                backgroundSize: '800px 100%',
                animation: 'shimmer 1.4s linear infinite',
              }}
            />
            <div
              className="h-3 w-20 rounded"
              style={{
                background:
                  'linear-gradient(90deg, var(--border) 0px, var(--code-bg) 200px, var(--border) 400px)',
                backgroundSize: '800px 100%',
                animation: 'shimmer 1.4s linear infinite',
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="mt-8 mx-auto max-w-md rounded-lg p-4 text-center"
        style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#dc2626',
        }}
      >
        {error}
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="pt-6 flex items-center justify-center gap-3 opacity-80">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow-sm"
          style={{
            background: 'var(--accent-bg)',
            border: '1px solid var(--accent-border)',
            color: 'var(--accent)',
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 rotate-180">
            <use href="/icons.svg#arrow-up-icon" />
          </svg>
        </span>
        <p className="m-0">Enter a GitHub username above to search.</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <p className="mt-10 opacity-70">
        No users found. Try searching for a different username.
      </p>
    );
  }

  return (
    <>
      <div className="mt-10 mb-4 flex flex-wrap items-center justify-between gap-3 text-left">
        <div>
          <div
            className="text-xs uppercase tracking-[0.14em] opacity-65"
            style={{ color: 'var(--text)' }}
          >
            Search Results
          </div>
          <div className="mt-1 text-lg font-medium" style={{ color: 'var(--text-h)' }}>
            {users.length} profiles for “{query || users[0].login}”
          </div>
        </div>
        <div
          className="rounded-full px-3 py-1 text-xs"
          style={{
            background: 'var(--chip-bg)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
        >
          Click a card for profile details
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {users.map((user, i) => (
          <button
            type="button"
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="group relative rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-lg overflow-hidden result-card"
            style={{
              background: 'var(--social-bg)',
              border: '1px solid var(--border)',
              animation: `fade-in-up 0.35s ease-out ${i * 30}ms both`,
            }}
          >
            <span
              className="absolute top-3 left-3 rounded-full px-2 py-1 text-[11px] font-medium"
              style={{
                background: 'var(--chip-bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
            >
              #{i + 1}
            </span>
            <span
              className="absolute top-3 right-3 rounded-full px-2 py-1 text-[11px] font-medium"
              style={{
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent-strong)',
              }}
            >
              {user.type}
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at top, var(--accent-bg), transparent 70%)',
              }}
            />
            <img
              src={user.avatar_url}
              alt={user.login}
              loading="lazy"
              className="w-20 h-20 rounded-full mb-3 ring-2 ring-offset-2 transition-transform group-hover:scale-105"
              style={{
                '--tw-ring-color': 'var(--accent)',
                '--tw-ring-offset-color': 'var(--bg)',
              } as React.CSSProperties}
            />
            <h3
              className="text-base font-semibold relative mt-1"
              style={{ color: 'var(--text-h)' }}
            >
              {user.login}
            </h3>
            <div
              className="relative mt-2 text-xs opacity-65"
              style={{ color: 'var(--text)' }}
            >
              github.com/{user.login}
            </div>
            <span
              className="text-xs mt-4 opacity-60 group-hover:opacity-100 transition-opacity relative"
              style={{ color: 'var(--accent)' }}
            >
              View details →
            </span>
          </button>
        ))}
      </div>
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}

export default UserList;
