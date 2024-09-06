import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Initialize state from localStorage
    const storedData = JSON.parse(localStorage.getItem('user_data'))

    if (storedData) {
      const { userToken, user } = storedData
      setToken(userToken)
      setUserData(user)
      setIsAuthenticated(true)
    } else {
      // Clear state if no data in localStorage
      setToken(null)
      setUserData(null)
      setIsAuthenticated(false)
    }
  }, []) // Empty dependency array ensures this runs only once

  function login(newToken, newData) {
    localStorage.setItem(
      'user_data',
      JSON.stringify({ userToken: newToken, user: newData })
    )

    setToken(newToken)
    setUserData(newData)
    setIsAuthenticated(true)
  }

  function logout() {
    localStorage.removeItem('user_data')
    setToken(null)
    setUserData(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, userData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
