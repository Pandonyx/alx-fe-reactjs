import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (currentPage) => {
    if (!username && !location && !minRepos) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const { items, total_count } = await fetchUserData({
        username,
        location,
        minRepos,
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
        className='flex flex-col gap-4 mb-8 sm:flex-row'
        onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Search by username...'
          className='flex-grow w-full p-2 text-white placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-md sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isLoading}
        />
        <input
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Filter by location...'
          className='flex-grow w-full p-2 text-white placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-md sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isLoading}
        />
        <input
          type='number'
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder='Min repositories...'
          min='0'
          className='flex-grow w-full p-2 text-white placeholder-gray-400 bg-gray-800 border border-gray-600 rounded-md sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isLoading}
        />
        <button
          type='submit'
          className='px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed'
          disabled={isLoading}>
          {isLoading && page === 1 ? "Searching..." : "Search"}
        </button>
      </form>

      <div className='mt-8'>
        {isLoading && users.length === 0 && (
          <p className='text-center text-gray-400'>Loading...</p>
        )}
        {error && <p className='text-center text-red-500'>{error}</p>}
        {users.length > 0 && (
          <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {users.map((user) => (
              <li
                key={user.id}
                className='p-4 text-center text-white transition-transform duration-200 transform bg-gray-800 rounded-lg shadow-lg hover:scale-105'>
                <img
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                  className='w-24 h-24 mx-auto mb-4 border-2 border-blue-400 rounded-full'
                />
                <h2 className='text-xl font-bold'>
                  <a
                    href={user.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-400 hover:underline'>
                    {user.name || user.login}
                  </a>
                </h2>
                {user.location && (
                  <p className='mt-2 text-sm text-gray-400'>
                    <strong>Location:</strong> {user.location}
                  </p>
                )}
                <p className='text-sm text-gray-400'>
                  <strong>Public Repos:</strong> {user.public_repos}
                </p>
              </li>
            ))}
          </ul>
        )}
        {users.length > 0 && users.length < totalCount && !isLoading && (
          <button
            onClick={handleLoadMore}
            className='block px-6 py-2 mx-auto mt-8 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed'
            disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}
        {!isLoading && !error && users.length === 0 && (
          <p className='text-center text-gray-400'>
            Search for users to see their profiles.
          </p>
        )}
      </div>
    </>
  );
};

export default Search;
