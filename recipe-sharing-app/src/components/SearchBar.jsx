import React from "react";
import useRecipeStore from "./recipeStore";

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type='text'
        value={searchTerm}
        placeholder='Search recipes by title...'
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "50%", padding: "8px" }}
      />
    </div>
  );
};

export default SearchBar;
