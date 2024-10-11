import axios from 'axios';

// Base URL of your API
const API_BASE_URL = 'http://localhost:5000/api'; // Adjust this URL to your actual API base URL

// Function to get all user profiles
const userData = JSON.parse(sessionStorage.getItem('user_data'));
export const getAllProfiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles`, {
      headers: {
        // Authorization: `Bearer ${userData.userToken}`, // Adjust if you store token differently
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error; // Throw the error to be handled by the calling function
  }
};

export const getSingleProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/${id}`, {
      headers: {
        // Authorization: `Bearer ${userData.userToken}`, // Adjust if you store token differently
      },
    });
    return response.data;
  } catch (e) {
    console.error('Error fetching profile:', e);
    throw e; // Throw the error to be handled by the calling function
  }
};
export const updateProfile = async (id, updatedData) => {
  try {
    const userData = JSON.parse(sessionStorage.getItem('user_data'));
    console.log(userData.user.id);

    console.log(updatedData);
    const response = await axios.patch(
      `${API_BASE_URL}/profile/${userData.user.id}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userData.userToken}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error('Error updating profile:', e);
    throw e; // Throw the error to be handled by the calling function
  }
};
