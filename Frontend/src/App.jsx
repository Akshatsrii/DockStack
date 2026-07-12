import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Navbar />
                <div className="content-body">
                  <Dashboard />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Navbar />
                <div className="content-body">
                  <Projects />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Navbar />
                <div className="content-body">
                  <Profile />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App