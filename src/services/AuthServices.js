import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class UserAuthentication {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async registerUser(userData) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/auth/register`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async authenticateUser(userDetail) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/auth/login`,
        userDetail,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async refreshAuthToken(token) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/refreshtoken`,
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // async resetPassword(userEmail) {
  //   try {
  //     const response = await axios.post(
  //       `${this.baseUrl}/reset`,
  //       { email: userEmail },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     return response.data
  //   } catch (error) {
  //     console.error(error)
  //     throw error
  //   }
  // }

  // async changePassword(newAuthDetails) {
  //   try {
  //     const response = await axios.post(
  //       `${this.baseUrl}/changepassword`,
  //       newAuthDetails,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     )
  //     return response.data
  //   } catch (error) {
  //     console.error(error)
  //     throw error
  //   }
  // }

  async getCurrentUserName() {
    try {
      const response = await axios.get(`${this.baseUrl}/currentusername`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserAuthentication;
