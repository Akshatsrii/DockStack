import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { ShieldCheck, User, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    setError("")
    setLoading(true)

    try {
      await api.post("/auth/register", { name, email, password })
      setSuccess(true)
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Registration failed. Try another email.")
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
            Create Account
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Get started with DockStack DevOps Platform
          </p>
        </div>

        {error && (
          <div className="alert-error">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            color: "var(--accent-emerald)",
            padding: "0.85rem 1rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            marginBottom: "1rem",
            textAlign: "center"
          }}>
            Registered successfully! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={16} style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)"
              }} />
              <input
                type="text"
                className="form-input"
                placeholder="Akshat Srivastava"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: "2.75rem" }}
                disabled={success}
              />
            </div>
          </div>

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
                disabled={success}
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
                disabled={success}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading || success} style={{ width: "100%" }}>
            {loading ? (
              <>
                <span className="spinner" style={{ marginRight: "0.5rem" }}></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus size={18} />
                <span>Register</span>
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
          <Link to="/" style={{
            color: "var(--text-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            textDecoration: "none"
          }}>
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register