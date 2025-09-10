import useRecipeStore from "./RecipeStore";

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

  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteRecipeButton;
