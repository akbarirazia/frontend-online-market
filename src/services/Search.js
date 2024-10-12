import axios from 'axios';

// Fetch listings filtered by search query (name or headline)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchUsersByQuery = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/search/user?query=${searchTerm}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    throw error; // Optionally rethrow the error for handling upstream
  }
};
