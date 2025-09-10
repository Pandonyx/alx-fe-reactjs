import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <div className='bg-slate-100 min-h-screen font-sans'>
        <div className='container mx-auto p-4 sm:p-6 lg:p-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-teal-800 text-center mb-8'>
            Recipe Sharing App
          </h1>
          <AddRecipeForm />
          <hr className='my-8 border-slate-300' />
          <SearchBar />
          <Routes>
            <Route
              path='/'
              element={<RecipeList />}
            />
            <Route
              path='/recipe/:recipeId'
              element={<RecipeDetails />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
