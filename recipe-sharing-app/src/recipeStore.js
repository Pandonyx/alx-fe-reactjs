import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      ingredients: [
        "Pasta",
        "Eggs",
        "Pancetta",
        "Parmesan Cheese",
        "Black Pepper",
      ],
    },
    {
      id: 2,
      title: "Chicken Curry",
      ingredients: [
        "Chicken Breast",
        "Onion",
        "Garlic",
        "Ginger",
        "Coconut Milk",
        "Curry Powder",
      ],
    },
  ],
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...recipe, id: Date.now() }],
    })),
}));

export default useRecipeStore;
