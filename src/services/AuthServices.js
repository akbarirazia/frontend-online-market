import axios from 'axios'

class UserAuthentication {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api/auth'
  }

  async registerUser(userData) {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async authenticateUser(userDetail) {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, userDetail, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
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
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async resetPassword(userEmail) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/reset`,
        { email: userEmail },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async changePassword(newAuthDetails) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/changepassword`,
        newAuthDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getCurrentUserName() {
    try {
      const response = await axios.get(`${this.baseUrl}/currentusername`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default UserAuthentication
