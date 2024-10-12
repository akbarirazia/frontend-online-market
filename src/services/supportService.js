import axios from 'axios';

// Base URL of your API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const supportService = {
  sendSupportRequest: async ({ userId, subject, message }) => {
    try {
      const response = await axios.post(API_BASE_URL + '/support', {
        userId,
        subject,
        message,
      });
      return response;
    } catch (e) {
      console.error(e);
      res.status(500).send('Error sending support request');
    }
  },
};
