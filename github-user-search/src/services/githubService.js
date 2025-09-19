import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Create an Axios instance for GitHub API
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header if an API key is available and not the placeholder
if (GITHUB_API_KEY && GITHUB_API_KEY !== "your_github_api_key_here") {
  githubApi.defaults.headers.common[
    "Authorization"
  ] = `token ${GITHUB_API_KEY}`;
} else {
  console.warn(
    "GitHub API Key not found. You may experience rate limiting from the GitHub API."
  );
}

/**
 * Fetches a user's profile from the GitHub API.
 * @param {string} username - The GitHub username to search for.
 * @returns {Promise<object>} The user data.
 */
export const fetchUser = async (username) => {
  if (!username) {
    return Promise.reject(new Error("Username is required"));
  }

  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    // Re-throw the error so the component can handle it (e.g., show an error message)
    throw error;
  }
};
