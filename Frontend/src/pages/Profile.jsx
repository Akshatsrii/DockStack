import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { User, Key, Server, KeyRound, Shield, CheckCircle } from "lucide-react"

function Profile() {
  const { user } = useContext(AuthContext)
  
  // Simulated keys input states
  const [awsKey, setAwsKey] = useState("AKIAIOSFODNN7EXAMPLE")
  const [doToken, setDoToken] = useState("dop_v1_0f4389fae8bc1a3de59b923cf0a...")
  const [githubToken, setGithubToken] = useState("ghp_J2m8S74f9d0c2e3a1b0c9d8e7f6e5...")
  
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSaveKeys = (e) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setTimeout(() => {
      setSaving(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="grid-2" style={{ alignItems: "start" }}>
      
      {/* LEFT COLUMN: User Account info */}
      <div className="glass-card">
        <div className="glass-card-header">
          <h3 className="card-title">User Account Info</h3>
          <User size={18} style={{ color: "var(--accent-cyan)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center", padding: "1rem 0" }}>
          {/* Large initials badge */}
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)",
            color: "#030712",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "800",
            boxShadow: "0 0 20px rgba(0, 242, 254, 0.2)"
          }}>
            {user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "DV"}
          </div>

          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>{user?.name || "Developer"}</span>
            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{user?.email || "developer@dockstack.io"}</span>
            <span style={{
              marginTop: "0.5rem",
              padding: "0.2rem 0.6rem",
              background: "rgba(16, 185, 129, 0.1)",
              color: "var(--accent-emerald)",
              fontSize: "0.75rem",
              borderRadius: "4px",
              fontWeight: "600",
              alignSelf: "center"
            }}>
              Active Developer Account
            </span>
          </div>
        </div>

        <hr style={{ border: 0, borderBottom: "1px solid var(--border-color)", margin: "1.5rem 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Account Role</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>Owner / Admin</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Organization</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>DockStack Root</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Member Since</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>July 2026</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: DevOps Integrations simulated keys */}
      <div className="glass-card">
        <div className="glass-card-header">
          <h3 className="card-title">Infrastructure Credentials</h3>
          <Shield size={18} style={{ color: "var(--accent-purple)" }} />
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Configure remote APIs and access tokens for Ansible setups and Terraform cloud provisions.
        </p>

        {success && (
          <div style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            color: "var(--accent-emerald)",
            padding: "0.85rem 1rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <CheckCircle size={16} />
            <span>Credentials updated and stored securely!</span>
          </div>
        )}

        <form onSubmit={handleSaveKeys} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div className="form-group">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Key size={14} style={{ color: "var(--accent-cyan)" }} />
              <label className="form-label">AWS Access Key ID (Terraform IaC)</label>
            </div>
            <input
              type="text"
              className="form-input font-mono"
              value={awsKey}
              onChange={(e) => setAwsKey(e.target.value)}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Server size={14} style={{ color: "var(--accent-cyan)" }} />
              <label className="form-label">DigitalOcean API Token (Server Host)</label>
            </div>
            <input
              type="password"
              className="form-input font-mono"
              value={doToken}
              onChange={(e) => setDoToken(e.target.value)}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <KeyRound size={14} style={{ color: "var(--accent-cyan)" }} />
              <label className="form-label">GitHub Personal Access Token (CI/CD Deployments)</label>
            </div>
            <input
              type="password"
              className="form-input font-mono"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving} style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
            {saving ? (
              <>
                <span className="spinner" style={{ marginRight: "0.5rem" }}></span>
                <span>Saving Credentials...</span>
              </>
            ) : (
              <span>Save Credentials</span>
            )}
          </button>

        </form>
      </div>

    </div>
  )
}

export default Profile