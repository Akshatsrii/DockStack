import axios from "axios"

// Use environment variable VITE_API_URL if defined, otherwise fall back to local dev or relative routing
const isLocalDev = window.location.port === "3000" || window.location.port === "5173"
const baseURL = import.meta.env.VITE_API_URL || (isLocalDev ? "http://localhost:5000/api" : "/api")

const api = axios.create({
  baseURL
})

// Request interceptor to add Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      // The backend authMiddleware checks req.headers.authorization directly
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api