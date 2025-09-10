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
 * @property {number[]} favorites - An array of favorite recipe IDs.
 * @property {Recipe[]} recommendations - An array of recommended recipes.
 * @property {(term: string) => void} setSearchTerm - Function to update the search term.
 * @property {(recipeId: number) => void} addFavorite - Adds a recipe to favorites.
 * @property {(recipeId: number) => void} removeFavorite - Removes a recipe from favorites.
 * @property {() => void} generateRecommendations - Generates a list of recommended recipes.
 */

/**
 * Zustand store for managing recipes.
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<RecipeStoreState>>}
 */
const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
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
  addFavorite: (recipeId) =>
    set((state) => ({ favorites: [...state.favorites, recipeId] })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),
  generateRecommendations: () =>
    set((state) => {
      // Mock implementation: recommend up to 2 random non-favorite recipes.
      const nonFavorites = state.recipes.filter(
        (recipe) => !state.favorites.includes(recipe.id)
      );
      const newRecommendations = nonFavorites.slice(0, 2);

      if (
        state.recommendations.length === newRecommendations.length &&
        state.recommendations.every(
          (rec, i) => rec.id === newRecommendations[i].id
        )
      ) {
        return {}; // Return empty object to prevent state update
      }

      return { recommendations: newRecommendations };
    }),
}));

export default useRecipeStore;
