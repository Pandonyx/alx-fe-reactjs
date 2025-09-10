import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>Recipe Sharing App</h1>
        <AddRecipeForm />
        <hr />
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
    </Router>
  );
}

export default App;
