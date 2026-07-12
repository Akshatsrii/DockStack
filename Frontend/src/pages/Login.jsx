import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"
import { ShieldCheck, Mail, Lock, LogIn, ArrowRight } from "lucide-react"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    
    setError("")
    setLoading(true)

    try {
      const response = await api.post("/auth/login", { email, password })
      if (response.data && response.data.token) {
        login(response.data.token, response.data.user)
        navigate("/dashboard")
      } else {
        setError("Invalid response from server")
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="glass-card" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem" }}>
        
        {/* Brand/Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)",
            color: "#030712",
            marginBottom: "1rem"
          }}>
            <ShieldCheck size={26} />
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "800", letterSpacing: "-0.03em" }}>
            Welcome to <span className="text-gradient">DockStack</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Sign in to manage your container deployments
          </p>
        </div>

        {error && (
          <div className="alert-error" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)"
              }} />
              <input
                type="email"
                className="form-input"
                placeholder="developer@dockstack.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)"
              }} />
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%" }}>
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: "0.5rem" }}></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        <div style={{
          marginTop: "1.75rem",
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--text-secondary)"
        }}>
          Don't have an account?{" "}
          <Link to="/register" style={{
            color: "var(--accent-cyan)",
            fontWeight: "600",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem"
          }}>
            Create Account <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login