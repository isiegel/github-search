import type { GitHubUser } from '../types/github';

interface UserListProps {
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}

function UserList({ users, loading, error, hasSearched }: UserListProps) {
  if (loading) {
    return <p className="pt-6">Loading...</p>;
  }

  if (error) {
    return <p className="pt-6 text-red-500">{error}</p>;
  }

  if (!hasSearched) {
    return <p className="pt-6">⬆️ Enter a GitHub username above to search.</p>;
  }

  if (users.length === 0) {
    return (
      <p className="pt-6">
        No users found. Try searching for a different username.
      </p>
    );
  }

  return (
    <>
      <span className="mt-8 text-l text-gray-800 inline-block">
        Results for <strong>{users[0].login}</strong>:
      </span>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-4 mt-0">
        {users.map((user) => (
          <div
            key={user.id}
            className="mt-4 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition hover:cursor-pointer"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold text-center text-gray-800">
              {user.login}
            </h3>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm text-center block mt-2 hover:underline"
            >
              View Profile →
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserList;
