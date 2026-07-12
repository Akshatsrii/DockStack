import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div className="spinner" style={{ width: "40px", height: "40px", color: "var(--accent-cyan)" }}></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
