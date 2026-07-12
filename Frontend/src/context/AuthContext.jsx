import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (storedToken) {
      setToken(storedToken)
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          setUser(null)
        }
      }
    }
    setLoading(false)
  }, [])

  const login = (jwtToken, userData) => {
    localStorage.setItem("token", jwtToken)
    localStorage.setItem("user", JSON.stringify(userData))
    setToken(jwtToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}