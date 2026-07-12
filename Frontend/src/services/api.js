import axios from "axios"

// Use absolute localhost url when running in local development mode (port 3000), 
// otherwise use relative path (/api) to route through Nginx reverse proxy.
const isLocalDev = window.location.port === "3000" || window.location.port === "5173"

const api = axios.create({
  baseURL: isLocalDev ? "http://localhost:5000/api" : "/api"
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