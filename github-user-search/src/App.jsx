import Search from "./components/Search";

function App() {
  return (
    <div className='min-h-screen p-4 text-white bg-gray-900 sm:p-8'>
      <header className='mb-8 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight'>
          GitHub User Search
        </h1>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;
