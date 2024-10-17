import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your actual API URL
const getToken = () => {
  const userData = sessionStorage.getItem('user_data'); // Retrieve the user_data
  if (userData) {
    const user = JSON.parse(userData); // Parse the JSON string
    return user.userToken; // Return the userToken
  }
  return null; // Return null if no user_data found
};

// Function to send a service request
export const sendServiceRequest = async (
  userId,
  serviceId,
  message,
  providerId
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/servicerequest`,
      {
        userId,
        serviceId,
        message,
        providerId,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Adjust if you store token differently
        },
      }
    );
    return response.data; // Returns the server response
  } catch (error) {
    console.error('Error sending service request:', error);
    throw error; // Handle the error as needed
  }
};

export const showServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    // console.log(response.data);
    return response.data;
    // Returns the server response
  } catch (error) {
    console.error('Error sending services request:', error);
  }
};
export const showServicesAndUsers = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/services/services-with-users`
    );
    // console.log(response.data);

    return response.data; // Returns the server response
  } catch (error) {
    console.error('Error sending services request:', error);
  }
};

export const fetchServiceRequests = async (userId) => {
  const API_URL = `${API_BASE_URL}/servicerequest/provider/${userId}`;

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Adjust if you store token differently
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    throw error; // You might want to handle the error differently
  }
};

export const fetchMyRequests = async (userId) => {
  const API_URL = `${API_BASE_URL}/servicerequest/requester/${userId}`;
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Adjust if you store token differently
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching service requests:', error);
    throw error; // You might want to handle the error differently
  }
};

export const answerRequest = async (requestId, newStatus) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/servicerequest/service-requests/${requestId}/status`,
      {
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Adjust if you store token differently
        },
      }
    );

    // Handle the response as needed (e.g., updating UI, logging)
    console.log('Status updated successfully:', response.data);

    // Optionally return the response data
    return response.data;
  } catch (error) {
    console.error('Error updating status:', error);
    alert('Failed to update status.');
    throw error; // Re-throw the error if further handling is needed
  }
};

export const assignService = async ({ userId, serviceIds }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/services/assign-services`,
      {
        userId: userId,
        serviceIds: serviceIds, // Replace with the desired provider ID
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Adjust if you store token differently
        },
      }
    );

    return response.data; // Consider returning the response data if needed
  } catch (error) {
    console.error('Error assigning service:', error); // Handle error appropriately
    throw error; // Rethrow or handle the error as per your requirements
  }
};

export const showUserService = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/services/user-services?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user services:', error);
    throw error; // Handle error appropriately
  }
};
