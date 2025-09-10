import useRecipeStore from "./recipeStore";

/**
 * @param {{recipeId: number, onAfterDelete?: () => void}} props
 */
const DeleteRecipeButton = ({ recipeId, onAfterDelete }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleClick = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipeId);
      if (onAfterDelete) onAfterDelete();
    }
  };

  return (
    <button
      onClick={handleClick}
      className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-200 ease-in-out'>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
