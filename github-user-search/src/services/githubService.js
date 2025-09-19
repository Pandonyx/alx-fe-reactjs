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
 * Searches for users on GitHub based on various criteria and fetches detailed profile for each.
 * @param {object} params - The search parameters.
 * @param {string} params.username - The GitHub username to search for.
 * @param {string} params.location - The location to filter by.
 * @param {string} params.minRepos - The minimum number of repositories.
 * @param {number} params.page - The page number for pagination.
 * @returns {Promise<{items: object[], total_count: number}>} The search results including detailed user data and total count.
 */
export const fetchUserData = async ({
  username,
  location,
  minRepos,
  page = 1,
}) => {
  const queryParts = [];
  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>${minRepos}`);

  if (queryParts.length === 0) {
    return { items: [], total_count: 0 };
  }

  const q = queryParts.join(" ");
  const searchUrl = `https://api.github.com/search/users?q=${encodeURIComponent(
    q
  )}`;

  try {
    const searchResponse = await githubApi.get(searchUrl, {
      params: { page, per_page: 10 },
    });

    const { items, total_count } = searchResponse.data;

    // To get detailed info like location and public_repos, we need to fetch each user.
    // This can be slow and hit rate limits. For a real-world app,
    // you might want to display only the info from the search result.
    const userPromises = items.map((user) =>
      githubApi.get(`/users/${user.login}`)
    );
    const userResponses = await Promise.all(userPromises);
    const detailedUsers = userResponses.map((res) => res.data);

    return { items: detailedUsers, total_count };
  } catch (error) {
    console.error("Error searching GitHub users:", error);
    throw error;
  }
};
