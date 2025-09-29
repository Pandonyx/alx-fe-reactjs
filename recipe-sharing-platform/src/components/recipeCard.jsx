import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className='overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105'>
      <div className='h-48 overflow-hidden'>
        <img
          src={recipe.image}
          alt={recipe.title}
          className='object-cover w-full h-full transition-transform duration-300 hover:scale-110'
        />
      </div>
      <div className='p-5'>
        <h3 className='mb-2 text-xl font-bold text-gray-800'>{recipe.title}</h3>
        <p className='mb-4 text-sm text-gray-600'>{recipe.summary}</p>
        <Link
          to={`/recipe/${recipe.id}`}
          className='block w-full px-4 py-2 text-center text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700'>
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
