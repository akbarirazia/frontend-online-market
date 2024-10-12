import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your actual API URL

// Function to fetch notifications for a specific user
export const fetchNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notification/${userId}`, {
      // Assuming you're passing userId as a query parameter
    });
    return response.data; // Returns the list of notifications
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // Handle the error as needed
  }
};
