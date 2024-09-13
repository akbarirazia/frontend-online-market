import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Initialize state from sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem('user_data'))

    if (storedData) {
      const { userToken, user } = storedData
      setToken(userToken)
      setUserData(user)
      setIsAuthenticated(true)
    } else {
      // Clear state if no data in sessionStorage
      setToken(null)
      setUserData(null)
      setIsAuthenticated(false)
    }
  }, []) // Empty dependency array ensures this runs only once

  function login(newToken, newData) {
    // Store data in sessionStorage
    sessionStorage.setItem(
      'user_data',
      JSON.stringify({ userToken: newToken, user: newData })
    )

    setToken(newToken)
    setUserData(newData)
    setIsAuthenticated(true)
  }

  function logout() {
    // Remove data from sessionStorage
    sessionStorage.removeItem('user_data')
    setToken(null)
    setUserData(null)
    setIsAuthenticated(false)
  }

  function updateUser(newData) {
    // Update sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem('user_data'))
    if (storedData) {
      sessionStorage.setItem(
        'user_data',
        JSON.stringify({ userToken: storedData.userToken, user: newData })
      )
    }

    // Update local state
    setUserData(newData)
  }

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, updateUser, userData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
