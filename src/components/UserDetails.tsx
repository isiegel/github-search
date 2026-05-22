import { useEffect, useState } from 'react';
import type { GitHubUser } from '../types/github';

interface UserDetailsProps {
  user: GitHubUser;
  onClose: () => void;
}

function UserDetails({ user, onClose }: UserDetailsProps) {
  const [userDetails, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://api.github.com/users/${user.login}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user.login]);

  if (loading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          animation: 'backdrop-in 0.2s ease-out',
        }}
      >
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div
            className="animate-spin rounded-full h-12 w-12 border-2 border-transparent mx-auto"
            style={{
              borderTopColor: 'var(--accent)',
              borderRightColor: 'var(--accent)',
            }}
          />
        </div>
      </div>
    );
  }

  if (!userDetails) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      style={{
        background: 'rgba(0, 0, 0, 0.45)',
        animation: 'backdrop-in 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-7 max-w-md w-full relative"
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
          animation: 'modal-in 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-xl opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
          style={{ color: 'var(--text-h)' }}
        >
          ×
        </button>

        <div className="flex flex-col items-center">
          <div
            className="rounded-full p-1"
            style={{
              background:
                'linear-gradient(135deg, var(--accent), var(--accent-border))',
            }}
          >
            <img
              src={userDetails.avatar_url}
              alt={userDetails.login}
              className="w-24 h-24 rounded-full block"
              style={{ background: 'var(--bg)' }}
            />
          </div>

          <h2 className="mt-4 mb-0" style={{ color: 'var(--text-h)' }}>
            {userDetails.name || userDetails.login}
          </h2>
          {userDetails.name && (
            <span className="text-sm opacity-60 mt-1">
              @{userDetails.login}
            </span>
          )}

          {userDetails.bio && (
            <p className="text-center mt-3 text-sm leading-relaxed opacity-80">
              {userDetails.bio}
            </p>
          )}
        </div>

        <div
          className="grid grid-cols-3 mt-6 rounded-xl overflow-hidden"
          style={{
            background: 'var(--social-bg)',
            border: '1px solid var(--border)',
          }}
        >
          {[
            { label: 'Repos', value: userDetails.public_repos },
            { label: 'Followers', value: userDetails.followers },
            { label: 'Following', value: userDetails.following },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="text-center py-3"
              style={
                i < 2 ? { borderRight: '1px solid var(--border)' } : undefined
              }
            >
              <div
                className="font-bold text-xl"
                style={{ color: 'var(--text-h)' }}
              >
                {stat.value ?? 0}
              </div>
              <div className="text-xs opacity-70 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <a
          href={userDetails.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-6 py-2.5 rounded-lg font-medium transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{
            background: 'var(--accent)',
            color: 'var(--bg)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default UserDetails;
