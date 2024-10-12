import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your actual API URL

export const ProjectService = {
  // Function to get all projects for a specific user
  getProjects: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/projects/users/${userId}`
      );
      return response.data; // Return the projects data
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error; // Rethrow the error for handling in components
    }
  },

  // Function to post a new project
  createProject: async (projectData) => {
    try {
      const response = await axios.post(
        API_BASE_URL + '/projects',
        projectData
      );
      return response.data; // Return the newly created project
    } catch (error) {
      console.error('Error creating project:', error);
      throw error; // Rethrow the error for handling in components
    }
  },

  // Function to update an existing project
  updateProject: async (projectId, projectData) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/projects/${projectId}`,
        projectData
      );
      return response.data; // Return the updated project
    } catch (error) {
      console.error('Error updating project:', error);
      throw error; // Rethrow the error for handling in components
    }
  },
  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/projects/${projectId}`
      );
      return response.message; // Return the deleted project ID or message (if successful)
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error; // Rethrow the error for handling in components
    }
  },
};
