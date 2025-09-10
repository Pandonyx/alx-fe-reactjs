import { useMemo } from "react";
import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";
import DeleteRecipeButton from "./DeleteRecipeButton";
import FavoriteButton from "./FavoriteButton";

const RecipeList = () => {
  // Select state slices individually for stability. This is more robust than
  // using `shallow` and prevents re-renders if other parts of the store change.
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const filteredRecipes = useMemo(
    () =>
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [recipes, searchTerm]
  );

  return (
    <div>
      <h2 className='mb-6 text-2xl font-semibold text-teal-800'>
        Available Recipes
      </h2>
      {recipes.length === 0 ? (
        <p className='py-10 text-center text-slate-500'>
          No recipes yet. Add one above!
        </p>
      ) : filteredRecipes.length === 0 ? (
        <p className='py-10 text-center text-slate-500'>
          No recipes found matching your search.
        </p>
      ) : (
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredRecipes.map((recipe) => (
            <li
              key={recipe.id}
              className='overflow-hidden transition-transform duration-300 ease-in-out transform bg-white border-t-4 border-teal-400 shadow-md rounded-xl hover:-translate-y-1'>
              <Link
                to={`/recipe/${recipe.id}`}
                className='block p-6 group'>
                <h3 className='text-xl font-bold text-gray-800 truncate transition-colors group-hover:text-teal-600'>
                  {recipe.title}
                </h3>
                <p className='h-12 mt-2 overflow-hidden text-gray-600'>
                  {recipe.description}
                </p>
              </Link>
              <div className='flex items-center justify-between p-4 border-t bg-slate-50 border-slate-200'>
                <DeleteRecipeButton recipeId={recipe.id} />
                <FavoriteButton recipeId={recipe.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
