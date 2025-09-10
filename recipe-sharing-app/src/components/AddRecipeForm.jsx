import { useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return; // Prevent empty submissions
    addRecipe({ id: Date.now(), title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 bg-white rounded-xl shadow-md space-y-4'>
      <h2 className='text-xl font-semibold text-teal-700'>Add a New Recipe</h2>
      <div>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Recipe Title'
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition'
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Recipe Description'
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition h-24'
        />
      </div>
      <button
        type='submit'
        className='w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out'>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
