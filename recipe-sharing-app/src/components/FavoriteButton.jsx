import useRecipeStore from "./recipeStore";

/**
 * A button to toggle the favorite status of a recipe.
 * @param {{recipeId: number}} props
 */
const FavoriteButton = ({ recipeId }) => {
  // Select data and actions separately for stability
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(recipeId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className='p-2 rounded-full hover:bg-pink-100 transition-colors'
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className={`w-6 h-6 ${
          isFavorite ? "text-pink-500 fill-current" : "text-gray-400"
        }`}>
        <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
      </svg>
    </button>
  );
};

export default FavoriteButton;
