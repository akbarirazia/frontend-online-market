import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Function to send a service request
export const sendServiceRequest = async (userId, serviceId, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/servicerequest`, {
      userId,
      serviceId,
      message,
    });
    return response.data; // Returns the server response
  } catch (error) {
    console.error('Error sending service request:', error);
    throw error; // Handle the error as needed
  }
};

export const showServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    console.log(response.data);
    return response.data;
    // Returns the server response
  } catch (error) {
    console.error('Error sending services request:', error);
  }
};
export const showServicesAndUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/all`);
    return response.data; // Returns the server response
  } catch (error) {
    console.error('Error sending services request:', error);
  }
};
