import { useState, useEffect, useRef } from "react"
import api from "../services/api"
import { 
  Plus, 
  GitBranch, 
  Folder, 
  Terminal as TerminalIcon, 
  Play, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  FileCode,
  Globe,
  Loader2,
  Trash2
} from "lucide-react"

function Projects() {
  const [projects, setProjects] = useState([])
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Form states
  const [name, setName] = useState("")
  const [repoUrl, setRepoUrl] = useState("")
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Active states
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeDeployment, setActiveDeployment] = useState(null)
  const [simulatedLogs, setSimulatedLogs] = useState([])
  const [isSimulating, setIsSimulating] = useState(false)

  const terminalEndRef = useRef(null)
  const simulationTimerRef = useRef(null)
  const pollingTimerRef = useRef(null)

  const fetchInitialData = async () => {
    try {
      const [projRes, depRes] = await Promise.all([
        api.get("/projects"),
        api.get("/deployments")
      ])
      setProjects(projRes.data)
      setDeployments(depRes.data)
      
      // Auto select the first project if none is selected
      if (projRes.data.length > 0 && !selectedProject) {
        setSelectedProject(projRes.data[0])
      }
    } catch (err) {
      console.error("Error fetching projects", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialData()
    return () => {
      if (simulationTimerRef.current) clearInterval(simulationTimerRef.current)
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current)
    }
  }, [])

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [simulatedLogs])

  // Poll for deployment status updates and stream real-time logs
  const startPolling = (depId) => {
    if (pollingTimerRef.current) clearInterval(pollingTimerRef.current)
    
    pollingTimerRef.current = setInterval(async () => {
      try {
        const res = await api.get("/deployments")
        const currentDep = res.data.find(d => d._id === depId)
        
        // Update general deployments list
        setDeployments(res.data)
        
        if (currentDep) {
          // Parse and render the logs stream from DB
          const lines = currentDep.logs ? currentDep.logs.split("\n") : []
          setSimulatedLogs(lines)
          
          if (currentDep.status === "success" || currentDep.status === "failed") {
            clearInterval(pollingTimerRef.current)
            setIsSimulating(false)
          }
        }
      } catch (err) {
        console.error("Polling error", err)
      }
    }, 1500)
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    if (!name || !repoUrl) {
      setFormError("Project name and git repo URL are required")
      return
    }

    setFormError("")
    setFormSuccess(false)
    setSubmitting(true)

    try {
      const res = await api.post("/projects", { name, repoUrl })
      setProjects([...projects, res.data])
      setSelectedProject(res.data)
      setName("")
      setRepoUrl("")
      setFormSuccess(true)
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create project")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeploy = async (projectId) => {
    if (isSimulating) return
    
    setIsSimulating(true)
    setSimulatedLogs(["🚀 [00:00] Initializing compilation agent and sending build instructions..."])
    
    try {
      const response = await api.post("/deployments", { projectId })
      const dep = response.data
      setActiveDeployment(dep)
      
      // Update deployments list
      setDeployments(prev => [dep, ...prev])
      
      // Start polling database to stream live logs from the backend runner
      startPolling(dep._id)

    } catch (err) {
      console.error(err)
      setIsSimulating(false)
      setSimulatedLogs(prev => [...prev, "❌ Error starting deployment: " + (err.response?.data?.message || err.message)])
    }
  }

  const viewPastLogs = (dep) => {
    setActiveDeployment(dep)
    setIsSimulating(false)
    if (simulationTimerRef.current) clearInterval(simulationTimerRef.current)
    
    // Create detailed log lines based on deployment status
    const lines = [
      `📅 Timestamp: ${new Date(dep.createdAt).toLocaleString()}`,
      `📦 Deployment ID: ${dep._id}`,
      `📂 Project Ref: ${dep.project?.name || selectedProject?.name}`,
      `------------------------------------------------------------`,
      `[INFO] Loading container configurations...`,
      `[INFO] Checking database connections...`,
      `[INFO] Deployment Status: ${dep.status.toUpperCase()}`,
      `[LOG] ${dep.logs}`
    ]

    if (dep.status === "success") {
      lines.push(
        `------------------------------------------------------------`,
        `🚀 Host Server Output:`,
        `Container Name: ${selectedProject?.name.toLowerCase().replace(/\s+/g, '-')}`,
        `Port: 3000 mapped to 80`,
        `Proxy Router: Nginx reverse proxy (http://localhost)`,
        `✅ Deployment completed successfully.`
      )
    }

    setSimulatedLogs(lines)
  }

  // Filter deployments for currently selected project
  const projectDeployments = deployments.filter(
    (d) => d.project === selectedProject?._id || d.project?._id === selectedProject?._id
  )

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="spinner" style={{ width: "40px", height: "40px", color: "var(--accent-cyan)" }}></div>
      </div>
    )
  }

  return (
    <div className="grid-2" style={{ gridTemplateColumns: "1fr 1.5fr", alignItems: "start" }}>
      
      {/* LEFT COLUMN: Project Manager and Creation */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Create Project Card */}
        <div className="glass-card">
          <div className="glass-card-header">
            <h3 className="card-title">Add Repository</h3>
            <Plus size={18} style={{ color: "var(--accent-cyan)" }} />
          </div>

          {formError && <div className="alert-error">{formError}</div>}
          
          {formSuccess && (
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              color: "var(--accent-emerald)",
              padding: "0.75rem",
              borderRadius: "8px",
              fontSize: "0.85rem",
              marginBottom: "1rem"
            }}>
              Project added successfully!
            </div>
          )}

          <form onSubmit={handleAddProject} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="My Node Server"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">GitHub Repo URL</label>
              <div style={{ position: "relative" }}>
                <GitBranch size={16} style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)"
                }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://github.com/username/repo"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  style={{ paddingLeft: "2.75rem" }}
                  disabled={submitting}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: "100%" }}>
              {submitting ? (
                <>
                  <Loader2 size={16} className="spinner" style={{ marginRight: "0.5rem" }} />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Create Project</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Projects Listing Menu */}
        <div className="glass-card">
          <div className="glass-card-header">
            <h3 className="card-title">Repositories</h3>
            <Folder size={18} />
          </div>

          {projects.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              No repositories added yet.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {projects.map((proj) => {
                const isSelected = selectedProject?._id === proj._id
                return (
                  <div
                    key={proj._id}
                    onClick={() => {
                      setSelectedProject(proj)
                      setSimulatedLogs([])
                      setActiveDeployment(null)
                    }}
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      background: isSelected ? "rgba(0, 242, 254, 0.05)" : "rgba(255, 255, 255, 0.02)",
                      border: "1px solid",
                      borderColor: isSelected ? "var(--accent-cyan)" : "var(--border-color)",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      transition: "all 0.25s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: "600", fontSize: "0.95rem", color: isSelected ? "var(--accent-cyan)" : "var(--text-primary)" }}>
                        {proj.name}
                      </span>
                    </div>
                    <span style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap"
                    }}>
                      {proj.repoUrl}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* RIGHT COLUMN: Active Project Details, Build Panel, Terminal Logs */}
      <div>
        {selectedProject ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Project Header details Card */}
            <div className="glass-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: "700" }}>{selectedProject.name}</h2>
                    <span style={{
                      padding: "0.15rem 0.5rem",
                      background: "rgba(0, 242, 254, 0.1)",
                      color: "var(--accent-cyan)",
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      borderRadius: "4px",
                      textTransform: "uppercase"
                    }}>Docker Stack</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <Globe size={14} style={{ color: "var(--text-muted)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>{selectedProject.repoUrl}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeploy(selectedProject._id)}
                  disabled={isSimulating}
                  className="btn btn-primary"
                  style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}
                >
                  {isSimulating ? (
                    <>
                      <Loader2 size={14} className="spinner" style={{ marginRight: "0.4rem" }} />
                      <span>Deploying...</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>Deploy Branch</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Build Log Terminal Console */}
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <div className="glass-card-header" style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <TerminalIcon size={18} style={{ color: "var(--accent-cyan)" }} />
                  <h3 className="card-title" style={{ fontSize: "1.1rem" }}>Deployment Output Logs</h3>
                </div>
                {activeDeployment && (
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Ref: {activeDeployment._id.slice(-6)}
                  </span>
                )}
              </div>

              <div className="terminal-container" style={{ marginTop: 0 }}>
                <div className="terminal-header">
                  <div className="terminal-controls">
                    <span className="terminal-dot red"></span>
                    <span className="terminal-dot yellow"></span>
                    <span className="terminal-dot green"></span>
                  </div>
                  <div className="terminal-title">docker-build@dockstack:~/project</div>
                </div>
                
                <div className="terminal-body" style={{ height: "280px" }}>
                  {simulatedLogs.length === 0 ? (
                    <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "0.85rem" }}>
                      Select a deployment from the history or click 'Deploy Branch' to view the log stream.
                    </div>
                  ) : (
                    <>
                      {simulatedLogs.map((line, idx) => {
                        let lineClass = "terminal-line"
                        if (line.includes("✅") || line.includes("[SUCCESS]")) lineClass += " info"
                        if (line.includes("❌") || line.includes("Error")) lineClass += " error"
                        return (
                          <div key={idx} className={lineClass}>
                            {line}
                          </div>
                        )
                      })}
                      {isSimulating && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-cyan)", marginTop: "0.25rem" }}>
                          <Loader2 size={12} className="spinner" />
                          <span>Streaming live terminal logs...</span>
                        </div>
                      )}
                      <div ref={terminalEndRef}></div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Project Deployments History */}
            <div className="glass-card">
              <div className="glass-card-header">
                <h3 className="card-title" style={{ fontSize: "1.1rem" }}>Deployments History</h3>
                <Calendar size={18} />
              </div>

              {projectDeployments.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  No deployment history for this project yet. Click 'Deploy Branch' to trigger the build.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {projectDeployments.map((dep) => (
                    <div
                      key={dep._id}
                      onClick={() => viewPastLogs(dep)}
                      style={{
                        padding: "1rem",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                        background: activeDeployment?._id === dep._id ? "rgba(255,255,255,0.03)" : "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                          Ref: {dep._id}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          Triggered: {new Date(dep.createdAt).toLocaleString()}
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        {dep.status === "success" ? (
                          <span className="status-pill status-success"><CheckCircle2 size={12} />Success</span>
                        ) : dep.status === "running" ? (
                          <span className="status-pill status-running"><Loader2 size={12} className="spinner" />Running</span>
                        ) : (
                          <span className="status-pill status-pending"><Clock size={12} />Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "40vh", textAlign: "center" }}>
            <FileCode size={48} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>No Project Selected</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem", maxWidth: "320px" }}>
              Please add a repository on the left panel or select an existing project to configure deployment scripts.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Projects