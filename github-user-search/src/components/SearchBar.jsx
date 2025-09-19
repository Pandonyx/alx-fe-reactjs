import { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    if (username) {
      onSearch(username);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder='Search for a GitHub user...'
        disabled={isLoading}
      />
      <button
        onClick={handleSearch}
        disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
