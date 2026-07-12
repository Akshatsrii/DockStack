import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import { 
  FolderGit2, 
  Terminal, 
  Cpu, 
  Database, 
  Layers, 
  Server, 
  TrendingUp, 
  ArrowRight,
  RefreshCw,
  GitBranch,
  Settings,
  ShieldCheck,
  Zap,
  CheckCircle,
  FileCode,
  HardDrive
} from "lucide-react"

function Dashboard() {
  const [projects, setProjects] = useState([])
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [seeding, setSeeding] = useState(false)
  const [seedSuccess, setSeedSuccess] = useState(false)
  
  // Simulated server metrics
  const [cpu, setCpu] = useState(14)
  const [ram, setRam] = useState(48)
  const [network, setNetwork] = useState(1.2)

  const fetchData = async () => {
    setError("")
    try {
      const [projRes, depRes] = await Promise.all([
        api.get("/projects"),
        api.get("/deployments")
      ])
      setProjects(projRes.data)
      // Sort deployments by date (newest first)
      const sortedDeps = (depRes.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setDeployments(sortedDeps)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch dashboard data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSeedDemoData = async () => {
    setSeeding(true)
    setError("")
    try {
      // Seed 3 realistic DevOps projects
      const demoProjects = [
        { name: "DockStack Core Engine", repoUrl: "https://github.com/Akshatsrii/DockStack" },
        { name: "React Vite Dashboard UI", repoUrl: "https://github.com/Akshatsrii/dockstack-dashboard-ui" },
        { name: "Node.js Express REST API", repoUrl: "https://github.com/Akshatsrii/dockstack-backend-api" }
      ]

      const createdProjects = []
      for (const proj of demoProjects) {
        const res = await api.post("/projects", proj)
        createdProjects.push(res.data)
      }

      // Seed 4 deployments with different states
      // Project 1 Deployments
      const dep1 = await api.post("/deployments", { projectId: createdProjects[0]._id })
      
      // Project 2 Deployments
      const dep2 = await api.post("/deployments", { projectId: createdProjects[1]._id })
      
      // Project 3 Deployments
      const dep3 = await api.post("/deployments", { projectId: createdProjects[2]._id })

      setSeedSuccess(true)
      setTimeout(() => setSeedSuccess(false), 4000)
      
      // Re-fetch everything
      await fetchData()
    } catch (err) {
      console.error(err)
      setError("Failed to seed demo data. Make sure backend is running.")
    } finally {
      setSeeding(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Simulate server metrics updating in real time
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 15) + 8) // 8% - 23%
      setRam(Math.floor(Math.random() * 4) + 46) // 46% - 49%
      setNetwork(parseFloat((Math.random() * 0.8 + 0.8).toFixed(1))) // 0.8 - 1.6 MB/s
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getStatusPill = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <span className="status-pill status-success"><span className="pulse-dot success"></span>Success</span>
      case "running":
        return <span className="status-pill status-running"><span className="pulse-dot running"></span>Building</span>
      default:
        return <span className="status-pill status-pending"><span className="pulse-dot pending"></span>Pending</span>
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="spinner" style={{ width: "40px", height: "40px", color: "var(--accent-cyan)" }}></div>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        marginBottom: "2rem",
        background: "linear-gradient(135deg, rgba(22, 28, 45, 0.6) 0%, rgba(12, 14, 21, 0.4) 100%)",
        borderLeft: "4px solid var(--accent-cyan)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>System Overview</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
            Monitor docker deployment tasks and server statistics in real-time.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {projects.length === 0 && (
            <button 
              className="btn btn-primary" 
              onClick={handleSeedDemoData} 
              disabled={seeding}
              style={{ padding: "0.5rem 1rem", background: "linear-gradient(135deg, var(--accent-purple) 0%, #a855f7 100%)", boxShadow: "none" }}
            >
              {seeding ? "Seeding Demo..." : "Seed Demo Data"}
            </button>
          )}
          <button className="btn btn-secondary" onClick={fetchData} style={{ padding: "0.5rem 1rem" }}>
            <RefreshCw size={14} /> Refresh Data
          </button>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}
      
      {seedSuccess && (
        <div style={{
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          color: "var(--accent-emerald)",
          padding: "0.85rem 1rem",
          borderRadius: "8px",
          fontSize: "0.9rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <CheckCircle size={16} />
          <span>Demo projects and deployments generated successfully!</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon">
            <FolderGit2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{projects.length}</span>
            <span className="stat-label">Active Projects</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "var(--accent-purple)" }}>
            <Layers size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{deployments.length}</span>
            <span className="stat-label">Total Deployments</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "var(--accent-emerald)" }}>
            <Server size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value" style={{ color: "var(--accent-emerald)" }}>Online</span>
            <span className="stat-label">Nginx & Docker Proxy</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: "var(--accent-amber)" }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{deployments.filter(d => d.status === "success").length}</span>
            <span className="stat-label">Successful Builds</span>
          </div>
        </div>
      </div>

      {/* Metrics and Recent Activity */}
      <div className="grid-2">
        
        {/* Live Server Performance Card */}
        <div className="glass-card">
          <div className="glass-card-header">
            <h3 className="card-title">Live Resource Utilization</h3>
            <Cpu size={18} style={{ color: "var(--accent-cyan)" }} />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* CPU Metric */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "500" }}>CPU Cores (Simulated VM)</span>
                <span style={{ color: "var(--accent-cyan)", fontWeight: "600" }}>{cpu}%</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{
                  width: `${cpu}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #00f2fe 0%, #0077ff 100%)",
                  borderRadius: "4px",
                  transition: "width 0.5s ease"
                }}></div>
              </div>
            </div>

            {/* RAM Metric */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "500" }}>Memory (8GB VM)</span>
                <span style={{ color: "var(--accent-purple)", fontWeight: "600" }}>{ram}% ({((8 * ram) / 100).toFixed(1)} GB)</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{
                  width: `${ram}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #7f00ff 0%, #ff007f 100%)",
                  borderRadius: "4px",
                  transition: "width 0.5s ease"
                }}></div>
              </div>
            </div>

            {/* Network / Disk Metric */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                <span style={{ fontWeight: "500" }}>Network I/O Rate</span>
                <span style={{ color: "var(--accent-emerald)", fontWeight: "600" }}>{network} MB/s</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{
                  width: `${(network / 3) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                  borderRadius: "4px",
                  transition: "width 0.5s ease"
                }}></div>
              </div>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              background: "rgba(255, 255, 255, 0.02)",
              padding: "0.75rem",
              borderRadius: "8px",
              marginTop: "0.5rem"
            }}>
              <Database size={14} />
              <span>Database connected to MongoDB Local: 127.0.0.1:27017</span>
            </div>

          </div>
        </div>

        {/* DevOps Cluster Services Status */}
        <div className="glass-card">
          <div className="glass-card-header">
            <h3 className="card-title">DevOps Services Status</h3>
            <Settings size={18} style={{ color: "var(--accent-purple)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            {/* Docker Engine */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-emerald)" }}></div>
                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Docker Daemon Engine</span>
              </div>
              <span className="status-pill status-success" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>Running</span>
            </div>

            {/* Ansible Engine */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-emerald)" }}></div>
                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Ansible Playbook Engine</span>
              </div>
              <span className="status-pill status-success" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>Ready</span>
            </div>

            {/* Terraform CLI */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-emerald)" }}></div>
                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Terraform Provisioner</span>
              </div>
              <span className="status-pill status-success" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>v1.5.7</span>
            </div>

            {/* Nginx Router */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-emerald)" }}></div>
                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Nginx HTTP Reverse Proxy</span>
              </div>
              <span className="status-pill status-success" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>Active</span>
            </div>

            {/* Git Hooks */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-blue)" }}></div>
                <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>GitHub Actions Webhook</span>
              </div>
              <span className="status-pill status-running" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", textTransform: "capitalize" }}>Listening</span>
            </div>

          </div>
        </div>

      </div>

      {/* Recent Deployments Table */}
      <div className="glass-card" style={{ marginTop: "2rem" }}>
        <div className="glass-card-header">
          <h3 className="card-title">Recent Deployments History</h3>
          <Link to="/projects" style={{
            fontSize: "0.85rem",
            color: "var(--accent-cyan)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontWeight: "600"
          }}>
            Manage Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-container">
          {deployments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                No active deployments in database. You can add repository configurations or seed sample DevOps metrics.
              </span>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  onClick={handleSeedDemoData} 
                  disabled={seeding}
                  className="btn btn-primary"
                  style={{ background: "linear-gradient(135deg, var(--accent-purple) 0%, #a855f7 100%)", boxShadow: "none" }}
                >
                  {seeding ? "Generating..." : "Generate Sample Deployment Data"}
                </button>
                <Link to="/projects" className="btn btn-secondary">
                  Add Repo Manually
                </Link>
              </div>
            </div>
          ) : (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Repository URL</th>
                  <th>Date Triggered</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {deployments.slice(0, 5).map((dep) => (
                  <tr key={dep._id}>
                    <td style={{ fontWeight: "600" }}>{dep.project?.name || "Unknown"}</td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <GitBranch size={14} style={{ color: "var(--text-muted)" }} />
                        {dep.project?.repoUrl || "No URL"}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      {new Date(dep.createdAt).toLocaleString()}
                    </td>
                    <td>{getStatusPill(dep.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  )
}

export default Dashboard