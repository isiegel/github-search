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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        </div>
      </div>
    );
  }

  if (!userDetails) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          ×
        </button>

        <img
          src={userDetails.avatar_url}
          alt={userDetails.login}
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />

        <h2 className="text-2xl font-bold text-center mt-4 text-gray-900">
          {userDetails.name || userDetails.login}
        </h2>

        {userDetails.bio && (
          <p className="text-gray-600 text-center mt-2">{userDetails.bio}</p>
        )}

        <div className="flex justify-around mt-6 border-t pt-4">
          <div className="text-center">
            <div className="font-bold text-xl text-gray-900">
              {userDetails.public_repos}
            </div>
            <div className="text-sm text-gray-600">Repos</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl text-gray-900">
              {userDetails.followers}
            </div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl text-gray-900">
              {userDetails.following}
            </div>
            <div className="text-sm text-gray-600">Following</div>
          </div>
        </div>

        <a
          href={userDetails.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default UserDetails;
