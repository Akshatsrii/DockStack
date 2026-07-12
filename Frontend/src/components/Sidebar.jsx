import { NavLink } from "react-router-dom"
import { LayoutDashboard, FolderGit2, UserCog, Box } from "lucide-react"

function Sidebar() {
  return (
    <div style={{
      width: "260px",
      background: "var(--bg-surface)",
      borderRight: "1px solid var(--border-color)",
      height: "100vh",
      position: "sticky",
      top: 0,
      display: "flex",
      flexDirection: "column",
      padding: "2rem 1.5rem"
    }}>
      {/* Brand Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "3rem"
      }}>
        <div style={{
          background: "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)",
          width: "36px",
          height: "36px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#030712"
        }}>
          <Box size={20} />
        </div>
        <div>
          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #ffffff 0%, var(--text-secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            DockStack
          </h1>
          <span style={{
            fontSize: "0.7rem",
            color: "var(--accent-cyan)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: "700"
          }}>
            DevOps Engine
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        flex: 1
      }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.85rem 1rem",
            borderRadius: "8px",
            color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
            background: isActive ? "rgba(0, 242, 254, 0.05)" : "transparent",
            border: "1px solid",
            borderColor: isActive ? "rgba(0, 242, 254, 0.15)" : "transparent",
            textDecoration: "none",
            fontWeight: isActive ? "600" : "500",
            fontSize: "0.95rem",
            transition: "all 0.25s ease"
          })}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/projects"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.85rem 1rem",
            borderRadius: "8px",
            color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
            background: isActive ? "rgba(0, 242, 254, 0.05)" : "transparent",
            border: "1px solid",
            borderColor: isActive ? "rgba(0, 242, 254, 0.15)" : "transparent",
            textDecoration: "none",
            fontWeight: isActive ? "600" : "500",
            fontSize: "0.95rem",
            transition: "all 0.25s ease"
          })}
        >
          <FolderGit2 size={18} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.85rem 1rem",
            borderRadius: "8px",
            color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
            background: isActive ? "rgba(0, 242, 254, 0.05)" : "transparent",
            border: "1px solid",
            borderColor: isActive ? "rgba(0, 242, 254, 0.15)" : "transparent",
            textDecoration: "none",
            fontWeight: isActive ? "600" : "500",
            fontSize: "0.95rem",
            transition: "all 0.25s ease"
          })}
        >
          <UserCog size={18} />
          <span>Profile Settings</span>
        </NavLink>
      </div>

      {/* Footer / System Status */}
      <div style={{
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border-color)",
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="pulse-dot success"></span>
          <span style={{ color: "var(--accent-emerald)", fontWeight: "600" }}>System Online</span>
        </div>
        <span>v0.0.1 (Beta)</span>
      </div>
    </div>
  )
}

export default Sidebar