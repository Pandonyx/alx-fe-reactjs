import { useEffect } from "react";
import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";

const RecommendationsList = () => {
  // Select data and actions separately to prevent re-renders from new function references.
  const { recommendations, favorites } = useRecipeStore(
    (state) => ({
      recommendations: state.recommendations,
      favorites: state.favorites,
    }),
    shallow
  );
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  // Automatically generate recommendations when favorites change.
  useEffect(() => {
    if (favorites.length > 0) {
      generateRecommendations();
    }
  }, [favorites, generateRecommendations]);

  return (
    <div className='p-6 bg-white rounded-xl shadow-md'>
      <h2 className='text-2xl font-semibold text-teal-800 mb-4'>
        Recommended For You
      </h2>
      {recommendations.length > 0 ? (
        <ul className='space-y-3'>
          {recommendations.map((recipe) => (
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
        <p className='text-slate-500'>
          Add some favorites to get recommendations!
        </p>
      )}
    </div>
  );
};

export default RecommendationsList;
