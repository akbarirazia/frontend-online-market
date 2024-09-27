import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

export const resetPass = {
  sendOtp: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/request-otp`, {
        email, // Email or phone number
      });
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error.response?.data || error;
    }
  },

  verifyOtp: async (otp, email) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        otp,
        email,
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error.response?.data || error;
    }
  },

  changePassword: async (userId, newPassword, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/change-password`,
        {
          userId,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error.response?.data || error;
    }
  },
};
