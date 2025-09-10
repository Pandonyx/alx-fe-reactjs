import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useMemo } from "react";

const FavoritesList = () => {
  const { recipes, favorites } = useRecipeStore(
    (state) => ({
      recipes: state.recipes,
      favorites: state.favorites,
    }),
    shallow
  );

  const favoriteRecipes = useMemo(
    () => recipes.filter((recipe) => favorites.includes(recipe.id)),
    [recipes, favorites]
  );

  return (
    <div className='p-6 bg-white shadow-md rounded-xl'>
      <h2 className='mb-4 text-2xl font-semibold text-teal-800'>
        My Favorites
      </h2>
      {favoriteRecipes.length > 0 ? (
        <ul className='space-y-3'>
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id}>
              <Link
                to={`/recipe/${recipe.id}`}
                className='text-lg text-gray-700 hover:text-teal-600 hover:underline'>
                {recipe.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-slate-500'>You have no favorite recipes yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
