import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description:
        "A classic Italian pasta dish made with egg, hard cheese, and cured pork.",
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "A flavorful and spicy chicken curry, perfect with rice.",
    },
  ],
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
}));

export default useRecipeStore;
