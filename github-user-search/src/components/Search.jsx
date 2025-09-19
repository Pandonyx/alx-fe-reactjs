import { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username) {
      onSearch(username);
    }
  };

  return (
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
  );
};

export default SearchBar;
