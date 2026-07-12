import { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { LogOut, User as UserIcon } from "lucide-react"

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // Get human readable title based on current path
  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard": return "System Dashboard"
      case "/projects": return "Projects & Deployments"
      case "/profile": return "User Settings"
      default: return "DockStack"
    }
  }

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      background: "rgba(12, 14, 21, 0.7)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border-color)",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "700", letterSpacing: "-0.02em" }}>
        {getTitle()}
      </h2>
      
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(0, 242, 254, 0.1)",
              border: "1px solid rgba(0, 242, 254, 0.3)",
              color: "var(--accent-cyan)"
            }}>
              <UserIcon size={16} />
            </div>
            <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--text-primary)" }}>
              {user.name}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{
              padding: "0.4rem 0.8rem",
              fontSize: "0.85rem",
              borderColor: "rgba(244, 63, 94, 0.2)",
              color: "var(--accent-rose)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(244, 63, 94, 0.05)"
            }}
            title="Log Out"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar