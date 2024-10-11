import axios from 'axios';

// Replace this with your actual method of obtaining the token
const getToken = () => {
  const userData = sessionStorage.getItem('user_data'); // Retrieve the user_data
  if (userData) {
    const user = JSON.parse(userData); // Parse the JSON string
    return user.userToken; // Return the userToken
  }
  return null; // Return null if no user_data found
};

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch opportunities function
const fetchOpportunities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/opportunities`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`, // Add Bearer token
      },
    });

    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    throw error; // Optionally rethrow the error for handling upstream
  }
};

// Apply for opportunity function
const applyForOpportunity = async ({ userId, opportunityId, coverletter }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/applications/opportunities/${opportunityId}/apply`,
      {
        userId,
        opportunityId,
        coverletter,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data; // Return the response data on success
  } catch (error) {
    console.error('Error applying for opportunity:', error);
    throw error; // Rethrow to handle upstream
  }
};

const postOpportunity = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/opportunities`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting opportunity:', error);
    throw error; // Rethrow to handle upstream
  }
};

export { fetchOpportunities, applyForOpportunity, postOpportunity };
