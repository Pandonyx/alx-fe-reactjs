import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipe data
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the recipe with matching id
        const foundRecipe = data.find((recipe) => recipe.id === parseInt(id));
        setRecipe(foundRecipe);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading recipe:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <p className='text-xl text-gray-600'>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <p className='mb-4 text-xl text-gray-600'>Recipe not found</p>
          <Link
            to='/'
            className='text-blue-600 hover:underline'>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-8 bg-gray-50'>
      <div className='container max-w-4xl px-4 mx-auto'>
        {/* Back Button */}
        <Link
          to='/'
          className='inline-flex items-center mb-6 text-blue-600 transition-colors hover:text-blue-800'>
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className='mb-8 overflow-hidden bg-white rounded-lg shadow-lg'>
          <img
            src={recipe.image}
            alt={recipe.title}
            className='object-cover w-full h-64 md:h-96'
          />
          <div className='p-6 md:p-8'>
            <h1 className='mb-4 text-3xl font-bold text-gray-800 md:text-4xl'>
              {recipe.title}
            </h1>
            <p className='text-lg text-gray-600'>{recipe.summary}</p>
          </div>
        </div>

        {/* Ingredients and Instructions Grid */}
        <div className='grid gap-8 md:grid-cols-2'>
          {/* Ingredients Section */}
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <h2 className='flex items-center mb-4 text-2xl font-bold text-gray-800'>
              <span className='mr-3 text-3xl'>🥘</span>
              Ingredients
            </h2>
            <ul className='space-y-3'>
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className='flex items-start'>
                  <span className='mt-1 mr-3 text-blue-600'>•</span>
                  <span className='text-gray-700'>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <h2 className='flex items-center mb-4 text-2xl font-bold text-gray-800'>
              <span className='mr-3 text-3xl'>👨‍🍳</span>
              Instructions
            </h2>
            <ol className='space-y-4'>
              {recipe.instructions.map((step, index) => (
                <li
                  key={index}
                  className='flex items-start'>
                  <span className='flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 font-bold text-white bg-blue-600 rounded-full'>
                    {index + 1}
                  </span>
                  <span className='pt-1 text-gray-700'>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
