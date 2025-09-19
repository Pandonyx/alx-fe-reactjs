import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (currentPage) => {
    if (!username && !location && !repos) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const { items, total_count } = await fetchUserData({
        username,
        location,
        repos,
        page: currentPage,
      });

      if (items.length === 0 && currentPage === 1) {
        setError("No users found for your search criteria.");
      }

      setUsers((prevUsers) =>
        currentPage === 1 ? items : [...prevUsers, ...items]
      );
      setTotalCount(total_count);
      setPage(currentPage);
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers([]);
    handleSearch(1);
  };

  const handleLoadMore = () => {
    handleSearch(page + 1);
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
          placeholder='Search by username...'
          disabled={isLoading}
        />
        <input
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Filter by location...'
          disabled={isLoading}
        />
        <input
          type='number'
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
          placeholder='Min repositories...'
          min='0'
          disabled={isLoading}
        />
        <button
          type='submit'
          disabled={isLoading}>
          {isLoading && page === 1 ? "Searching..." : "Search"}
        </button>
      </form>

      <div className='user-profile-container'>
        {isLoading && users.length === 0 && <p>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {users.length > 0 && (
          <ul className='results-list'>
            {users.map((user) => (
              <li
                key={user.id}
                className='user-profile-card'>
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
                {user.location && (
                  <p>
                    <strong>Location:</strong> {user.location}
                  </p>
                )}
                <p>
                  <strong>Public Repos:</strong> {user.public_repos}
                </p>
              </li>
            ))}
          </ul>
        )}
        {users.length > 0 && users.length < totalCount && !isLoading && (
          <button
            onClick={handleLoadMore}
            className='load-more-button'
            disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}
        {!isLoading && !error && users.length === 0 && (
          <p>Search for users to see their profiles.</p>
        )}
      </div>
    </>
  );
};

export default Search;
