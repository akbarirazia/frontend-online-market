import axios from 'axios'

// Base URL of your API
const API_BASE_URL = 'http://localhost:5000/api' // Adjust this URL to your actual API base URL

// Function to get all user profiles
export const getAllProfiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if you store token differently
      },
    })
    return response.data // Return the data from the response
  } catch (error) {
    console.error('Error fetching profiles:', error)
    throw error // Throw the error to be handled by the calling function
  }
}

export const getSingleProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if you store token differently
      },
    })
    return response.data
  } catch (e) {
    console.error('Error fetching profile:', e)
    throw e // Throw the error to be handled by the calling function
  }
}
export const updateProfile = async (id, updatedData) => {
  try {
    console.log(updatedData)
    const response = await axios.patch(
      `${API_BASE_URL}/profile/${id}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust if needed
        },
      }
    )
    return response.data
  } catch (e) {
    console.error('Error updating profile:', e)
    throw e // Throw the error to be handled by the calling function
  }
}
