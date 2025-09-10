import { useState } from "react";
import useRecipeStore from "./recipeStore";

/**
 * @param {{recipe: import('./recipeStore').Recipe, onSave: () => void}} props
 */
const EditRecipeForm = ({ recipe, onSave }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    updateRecipe(recipe.id, { title, description });
    onSave(); // Call the onSave callback to close the form
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition'
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
        className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition h-32'
      />
      <div className='flex justify-end gap-4'>
        <button
          type='button'
          onClick={onSave}
          className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out'>
          Cancel
        </button>
        <button
          type='submit'
          className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
