import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeList = () => {
  // Select the raw data needed from the store.
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className='text-2xl font-semibold text-teal-800 mb-6'>
        Available Recipes
      </h2>
      {recipes.length === 0 ? (
        <p className='text-slate-500 text-center py-10'>
          No recipes yet. Add one above!
        </p>
      ) : filteredRecipes.length === 0 ? (
        <p className='text-slate-500 text-center py-10'>
          No recipes found matching your search.
        </p>
      ) : (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredRecipes.map((recipe) => (
            <li
              key={recipe.id}
              className='bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out border-t-4 border-teal-400'>
              <Link
                to={`/recipe/${recipe.id}`}
                className='block p-6 group'>
                <h3 className='text-xl font-bold text-gray-800 truncate group-hover:text-teal-600 transition-colors'>
                  {recipe.title}
                </h3>
                <p className='text-gray-600 mt-2 h-12 overflow-hidden'>
                  {recipe.description}
                </p>
              </Link>
              <div className='p-4 bg-slate-50 border-t border-slate-200'>
                <DeleteRecipeButton recipeId={recipe.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
