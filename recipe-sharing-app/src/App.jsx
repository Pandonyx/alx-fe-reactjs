import React from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import useRecipeStore from "./components/RecipeStore";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Recipe Book</h1>
      </header>
      <main>
        <AddRecipeForm />
        <hr />
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
