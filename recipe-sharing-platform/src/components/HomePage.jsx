import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./recipeCard";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <p className='text-xl text-gray-600'>Loading recipes...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm'>
        <div className='container px-4 py-6 mx-auto'>
          <h1 className='text-4xl font-bold text-center text-gray-800'>
            Recipe Sharing Platform
          </h1>
          <p className='mt-2 text-center text-gray-600'>
            Discover and share amazing recipes
          </p>
        </div>
      </header>

      <main className='container px-4 py-8 mx-auto'>
        <h2 className='mb-6 text-2xl font-semibold text-gray-800'>
          All Recipes ({recipes.length})
        </h2>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
