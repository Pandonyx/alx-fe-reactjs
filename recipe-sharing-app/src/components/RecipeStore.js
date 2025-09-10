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
 * @property {(recipeId: number) => void} deleteRecipe - Function to delete a recipe by its ID.
 * @property {(recipeId: number, updatedData: Partial<Recipe>) => void} updateRecipe - Function to update a recipe.
 * @property {string} searchTerm - The current search term.
 * @property {(term: string) => void} setSearchTerm - Function to update the search term.
 */

/**
 * Zustand store for managing recipes.
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<RecipeStoreState>>}
 */
const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
  updateRecipe: (recipeId, updatedData) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, ...updatedData } : recipe
      ),
    })),
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useRecipeStore;
