import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === parseInt(recipeId, 10))
  );

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div>
      {isEditing ? (
        <EditRecipeForm
          recipe={recipe}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <DeleteRecipeButton
            recipeId={recipe.id}
            onAfterDelete={() => navigate("/")}
          />
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
