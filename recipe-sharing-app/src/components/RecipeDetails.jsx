import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";
import FavoriteButton from "./FavoriteButton";
import { shallow } from "zustand/shallow";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Select the raw recipes array from the store.
  const recipes = useRecipeStore((state) => state.recipes);

  // Compute the derived state (the specific recipe) inside the component.
  // This is more performant and avoids potential re-render issues with selectors.
  const recipe = recipes.find((r) => r.id === parseInt(recipeId, 10));

  if (!recipe) {
    return (
      <div className='text-center text-slate-500 py-10'>Recipe not found.</div>
    );
  }

  return (
    <div className='p-6 sm:p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto border-t-4 border-teal-400'>
      {isEditing ? (
        <EditRecipeForm
          recipe={recipe}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <h1 className='text-3xl font-bold text-teal-900 mb-4'>
            {recipe.title}
          </h1>
          <p className='text-gray-700 text-lg whitespace-pre-wrap leading-relaxed'>
            {recipe.description}
          </p>
          <div className='mt-8 flex items-center gap-4'>
            <button
              onClick={() => setIsEditing(true)}
              className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out'>
              Edit
            </button>
            <DeleteRecipeButton
              recipeId={recipe.id}
              onAfterDelete={() => navigate("/")}
            />
            <FavoriteButton recipeId={recipe.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
