import { create } from "zustand";

/**
 * @typedef {object} Recipe
 * @property {number} id - The unique identifier for the recipe.
 * @property {string} title - The title of the recipe.
 * @property {string} description - The description of the recipe.
 */

/**
 * @typedef {object} RecipeStoreState
 * @property {Recipe[]} recipes - The list of recipes.
 * @property {(newRecipe: Recipe) => void} addRecipe - Function to add a new recipe.
 * @property {(recipes: Recipe[]) => void} setRecipes - Function to set all recipes.
 * @property {(recipeId: number) => void} removeRecipe - Function to remove a recipe by its ID.
 */

/**
 * Zustand store for managing recipes.
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<RecipeStoreState>>}
 */
const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  removeRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
}));

export default useRecipeStore;
