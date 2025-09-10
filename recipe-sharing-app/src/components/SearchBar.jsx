import React from "react";
import useRecipeStore from "./recipeStore";

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <div className='mb-8'>
      <input
        type='text'
        value={searchTerm}
        placeholder='Search recipes by title...'
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition'
      />
    </div>
  );
};

export default SearchBar;
