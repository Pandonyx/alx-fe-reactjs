import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Recipe title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!summary.trim()) {
      newErrors.summary = "Recipe summary is required";
    } else if (summary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters long";
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const ingredientList = ingredients
        .split("\n")
        .filter((item) => item.trim());
      if (ingredientList.length < 2) {
        newErrors.ingredients =
          "Please add at least 2 ingredients (one per line)";
      }
    }

    if (!instructions.trim()) {
      newErrors.instructions = "Preparation steps are required";
    } else {
      const stepsList = instructions.split("\n").filter((item) => item.trim());
      if (stepsList.length < 2) {
        newErrors.instructions =
          "Please add at least 2 preparation steps (one per line)";
      }
    }

    if (image && !image.startsWith("http") && !image.startsWith("/")) {
      newErrors.image = "Please enter a valid image URL or path";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      summary: summary.trim(),
      image: image.trim() || "/placeholder.jpg",
      ingredients: ingredients.split("\n").filter((item) => item.trim()),
      instructions: instructions.split("\n").filter((item) => item.trim()),
    };

    console.log("New Recipe:", newRecipe);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Recipe added successfully!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className='min-h-screen py-8 bg-gray-50 md:py-12'>
      <div className='container max-w-3xl px-4 mx-auto'>
        {/* Header */}
        <div className='mb-6 md:mb-8'>
          <Link
            to='/'
            className='inline-flex items-center mb-4 text-gray-600 transition-colors hover:text-gray-900 md:mb-6'>
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Back
          </Link>
          <h1 className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
            Add New Recipe
          </h1>
          <p className='text-gray-600'>Share your favorite recipe</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='p-6 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm md:p-8'>
          {/* Title */}
          <div>
            <label
              htmlFor='title'
              className='block mb-2 text-sm font-medium text-gray-700'>
              Recipe Title *
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder='e.g., Chocolate Chip Cookies'
            />
            {errors.title && (
              <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
            )}
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor='summary'
              className='block mb-2 text-sm font-medium text-gray-700'>
              Summary *
            </label>
            <textarea
              id='summary'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows='3'
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
                errors.summary ? "border-red-500" : "border-gray-300"
              }`}
              placeholder='Brief description of your recipe'
            />
            {errors.summary && (
              <p className='mt-1 text-sm text-red-600'>{errors.summary}</p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label
              htmlFor='ingredients'
              className='block mb-2 text-sm font-medium text-gray-700'>
              Ingredients *{" "}
              <span className='font-normal text-gray-500'>(one per line)</span>
            </label>
            <textarea
              id='ingredients'
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows='8'
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono text-sm resize-none ${
                errors.ingredients ? "border-red-500" : "border-gray-300"
              }`}
              placeholder='2 cups flour&#10;1 cup sugar&#10;3 eggs'
            />
            {errors.ingredients && (
              <p className='mt-1 text-sm text-red-600'>{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label
              htmlFor='instructions'
              className='block mb-2 text-sm font-medium text-gray-700'>
              Preparation Steps *{" "}
              <span className='font-normal text-gray-500'>(one per line)</span>
            </label>
            <textarea
              id='instructions'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows='10'
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono text-sm resize-none ${
                errors.instructions ? "border-red-500" : "border-gray-300"
              }`}
              placeholder='Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients'
            />
            {errors.instructions && (
              <p className='mt-1 text-sm text-red-600'>{errors.instructions}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor='image'
              className='block mb-2 text-sm font-medium text-gray-700'>
              Image URL <span className='text-gray-500'>(optional)</span>
            </label>
            <input
              type='text'
              id='image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
              placeholder='https://example.com/image.jpg'
            />
            {errors.image && (
              <p className='mt-1 text-sm text-red-600'>{errors.image}</p>
            )}
          </div>

          {/* Buttons */}
          <div className='flex flex-col gap-4 pt-4 md:flex-row'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}>
              {isSubmitting ? "Submitting..." : "Submit Recipe"}
            </button>
            <Link
              to='/'
              className='px-6 py-3 font-medium text-center text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
