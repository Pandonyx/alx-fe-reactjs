import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

function App() {
  return (
    <Router>
      <div className='min-h-screen font-sans bg-slate-100'>
        <div className='container p-4 mx-auto sm:p-6 lg:p-8'>
          <h1 className='mb-8 text-3xl font-bold text-center text-teal-800 sm:text-4xl'>
            Recipe Sharing App
          </h1>
          <AddRecipeForm />
          <hr className='my-8 border-slate-300' />
          <SearchBar />
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
                    <div className='lg:col-span-2'>
                      <RecipeList />
                    </div>
                    <div className='space-y-8'></div>
                  </div>
                </>
              }
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
