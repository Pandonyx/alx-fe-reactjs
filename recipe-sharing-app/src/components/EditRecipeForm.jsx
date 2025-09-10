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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
      />
      <button type='submit'>Save Changes</button>
      <button
        type='button'
        onClick={onSave}>
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;
