import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserProfileCard from "./components/UserProfileCard";
import { fetchUser } from "./services/githubService";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    try {
      const userData = await fetchUser(username);
      setUser(userData);
    } catch (err) {
      setError(`User not found or an error occurred. Please try again.`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <header>
        <h1>GitHub User Search</h1>
      </header>
      <main>
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className='user-profile-container'>
          {isLoading && <p>Loading...</p>}
          {error && <p className='error'>{error}</p>}
          {user && <UserProfileCard user={user} />}
          {!isLoading && !error && !user && (
            <p>Search for a user to see their profile.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
