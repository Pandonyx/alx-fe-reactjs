import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div className='container'>
      <header>
        <h1>GitHub User Search</h1>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;
