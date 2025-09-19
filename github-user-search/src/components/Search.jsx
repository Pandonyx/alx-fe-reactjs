import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setUser(null);
    try {
      const userData = await fetchUserData(username);
      setUser(userData);
    } catch (err) {
      setError("Looks like we cant find the user");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className='search-container'
        onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Search for a GitHub user...'
          disabled={isLoading}
        />
        <button
          type='submit'
          disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className='user-profile-container'>
        {isLoading && <p>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {user && (
          <div className='user-profile-card'>
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className='avatar'
            />
            <h2>
              <a
                href={user.html_url}
                target='_blank'
                rel='noopener noreferrer'>
                {user.name || user.login}
              </a>
            </h2>
            <p>{user.bio}</p>
            <ul>
              <li>
                <strong>Followers:</strong> {user.followers}
              </li>
              <li>
                <strong>Following:</strong> {user.following}
              </li>
              <li>
                <strong>Public Repos:</strong> {user.public_repos}
              </li>
            </ul>
          </div>
        )}
        {!isLoading && !error && !user && (
          <p>Search for a user to see their profile.</p>
        )}
      </div>
    </>
  );
};

export default Search;
