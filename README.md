<div align="center">

<!-- TOP WAVE -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=200&section=header&text=DockStack&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=Full%20Stack%20DevOps%20Deployment%20Platform&descSize=22&descAlignY=60&descColor=a78bfa&animation=fadeIn" width="100%"/>

<!-- BADGES -->
<p>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/>
</p>

<p>
  <img src="https://img.shields.io/github/stars/yourusername/dockstack-devops-platform?style=social"/>
  <img src="https://img.shields.io/github/forks/yourusername/dockstack-devops-platform?style=social"/>
  <img src="https://img.shields.io/github/license/yourusername/dockstack-devops-platform?color=violet"/>
  <img src="https://img.shields.io/badge/Maintained-Yes-brightgreen"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-blueviolet"/>
</p>

<br/>

> 🚀 **A production-grade DevOps platform** demonstrating containerized deployments, infrastructure as code, automated CI/CD, and reverse proxy — all wired together in one cohesive project.

<br/>

</div>

---

## 📌 Table of Contents

- [🏗 Project Architecture](#-project-architecture)
- [⚙️ Deployment Pipeline](#️-deployment-pipeline)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📡 API Endpoints](#-api-endpoints)
- [🌍 Terraform Infrastructure](#-terraform-infrastructure)
- [🤖 Ansible Configuration](#-ansible-server-configuration)
- [🔄 CI/CD Pipeline](#-cicd-deployment)
- [✨ Features](#-features)
- [🔮 Future Improvements](#-future-improvements)

---

## 🏗 Project Architecture

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                         │
│                     🌐 http://localhost                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              🔀  Nginx  (Reverse Proxy :80)                 │
└──────────────┬──────────────────────────┬───────────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────┐    ┌─────────────────────────────┐
│  ⚛️  React Frontend  │    │  🟢 Node.js + Express API   │
│     (Vite Build)     │    │   JWT Auth  •  REST Routes  │
└──────────────────────┘    └──────────────┬──────────────┘
                                           │
                                           ▼
                            ┌─────────────────────────┐
                            │  🍃  MongoDB Database   │
                            │  Users  •  Collections  │
                            └─────────────────────────┘
```

</div>

---

## ⚙️ Deployment Pipeline

<div align="center">

```mermaid
flowchart TD
    A([👨‍💻 Developer]) -->|git push origin main| B

    B[📦 GitHub Repository\nMain Branch]
    B --> C

    subgraph CI ["🔄 GitHub Actions CI/CD"]
        C[🔍 Trigger Workflow\ndeploy.yml]
        C --> D[🔑 Load SSH Secrets\n& ENV Variables]
        D --> E[📡 SSH into Server]
    end

    subgraph SERVER ["🖥️ Cloud Server - Provisioned via Terraform + Ansible"]
        E --> F[📥 Pull Latest Code\ngit pull origin main]
        F --> G[🐳 Docker Compose\ndocker compose up --build]
        G --> H[🔀 Nginx Proxy\nPort 80]
        H --> I([⚛️ Frontend\nReact / Vite])
        H --> J([🟢 Backend API\nNode.js / Express])
        J --> K([🍃 MongoDB\nDatabase])
    end

    K --> L([🌐 Application Live!])

    style CI fill:#1e1b4b,stroke:#7c3aed,color:#e9d5ff
    style SERVER fill:#052e16,stroke:#16a34a,color:#bbf7d0
    style A fill:#1e3a5f,stroke:#3b82f6,color:#bfdbfe
    style L fill:#3b0764,stroke:#a855f7,color:#f3e8ff
```

</div>

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:----------:|:--------|
| 🖥️ **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | UI & Fast Bundling |
| 🔧 **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | REST API Server |
| 🔐 **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | Authentication |
| 🗄️ **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | NoSQL Storage |
| 🔀 **Proxy** | ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white) | Reverse Proxy |
| 🐳 **Containers** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) | Containerization |
| 🌍 **IaC** | ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat&logo=terraform&logoColor=white) | Cloud Provisioning |
| 🤖 **Config** | ![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=flat&logo=ansible&logoColor=white) | Server Setup |
| 🔄 **CI/CD** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white) | Auto Deployment |

</div>

---

## 📁 Project Structure

```
dockstack-devops-platform/
│
├── 🟢 backend/
│   ├── controllers/       ← Route logic & business rules
│   ├── models/            ← Mongoose schemas
│   ├── routes/            ← Express route definitions
│   ├── config/            ← DB config, env setup
│   └── server.js          ← App entry point
│
├── ⚛️  frontend/
│   └── src/               ← React components & pages
│
├── 🐳 docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml ← Orchestrates all services
│
├── 🔀 nginx/
│   └── default.conf       ← Reverse proxy routing rules
│
├── 🌍 terraform/
│   ├── main.tf            ← Cloud resource definitions
│   └── variables.tf       ← Configurable inputs
│
├── 🤖 ansible/
│   └── setup.yml          ← Installs Docker, Git on server
│
└── 🔄 .github/
    └── workflows/
        └── deploy.yml     ← Auto-deploy on main push
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

![Docker](https://img.shields.io/badge/Docker-Required-2496ED?style=flat&logo=docker&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=nodedotjs&logoColor=white)
![Git](https://img.shields.io/badge/Git-Required-F05032?style=flat&logo=git&logoColor=white)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/dockstack-devops-platform.git
cd dockstack-devops-platform
```

### 2️⃣ Launch with Docker Compose

```bash
docker compose -f docker/docker-compose.yml up --build
```

### 3️⃣ Open in Browser

```
http://localhost
```

> 🟢 All services — Frontend, Backend, MongoDB, and Nginx — start together automatically.

---

## 📡 API Endpoints

<div align="center">

| Method | Endpoint | Description | Auth Required |
|:------:|:---------|:------------|:-------------:|
| `GET` | `/api/health` | Health check | ❌ |
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login & get JWT token | ❌ |

</div>

**Example Request — Register User:**

```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "akshat", "password": "securepass123"}'
```

**Example Response:**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 🌍 Terraform Infrastructure

> Provisions a cloud server ready for Docker deployments.

```bash
# Step 1 — Initialize Terraform
cd terraform
terraform init

# Step 2 — Preview infrastructure changes
terraform plan

# Step 3 — Apply and create the server
terraform apply
```

```
terraform apply output:
  ✅  aws_instance.dockstack_server: Creation complete
  ✅  Public IP: 54.xxx.xxx.xxx
  ✅  Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

---

## 🤖 Ansible Server Configuration

> Automatically installs Docker, Git, and other dependencies on your server.

```bash
ansible-playbook setup.yml
```

```yaml
# ansible/setup.yml (overview)
- Install Docker & Docker Compose
- Install Git
- Configure firewall rules
- Enable Docker service on boot
```

---

## 🔄 CI/CD Deployment

> Push to `main` → application is live. Zero manual steps.

```mermaid
sequenceDiagram
    participant Dev as 👨‍💻 Developer
    participant GH as 📦 GitHub
    participant GA as 🔄 GitHub Actions
    participant SRV as 🖥️ Server

    Dev->>GH: git push origin main
    GH->>GA: Trigger deploy.yml
    GA->>GA: Load SSH keys & secrets
    GA->>SRV: SSH connection established
    SRV->>SRV: git pull latest code
    SRV->>SRV: docker compose up --build
    SRV-->>Dev: ✅ Deployment successful!
```

**Required GitHub Secrets:**

| Secret | Description |
|:-------|:------------|
| `SSH_PRIVATE_KEY` | Private key for server access |
| `SERVER_IP` | Your cloud server IP |
| `SSH_USER` | Server username (e.g. `ubuntu`) |

---

## ✨ Features

<div align="center">

| Feature | Status |
|:--------|:------:|
| Full Stack Web Application (React + Node.js) | ✅ |
| Docker Containerization | ✅ |
| Nginx Reverse Proxy | ✅ |
| MongoDB Database | ✅ |
| JWT Authentication | ✅ |
| Infrastructure as Code (Terraform) | ✅ |
| Server Configuration (Ansible) | ✅ |
| Automated CI/CD Deployment | ✅ |

</div>

---

## 🔮 Future Improvements

```
🔜  Kubernetes Deployment         — Container orchestration at scale
🔜  Prometheus & Grafana          — Metrics, dashboards & alerting
🔜  Redis Caching                 — Faster reads, session management
🔜  HTTPS with Let's Encrypt      — Free SSL/TLS certificates
🔜  Custom Domain Configuration   — Production-ready URLs
```

---

## 👨‍💻 Author

<div align="center">

<img src="https://avatars.githubusercontent.com/yourusername" width="90" style="border-radius:50%"/>

### Akshat Srivastava
*Built with ❤️ and a lot of `docker compose up`*

</div>

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

<br/>

<!-- BOTTOM WAVE -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=140&section=footer&text=Happy%20Shipping!&fontSize=28&fontColor=a78bfa&fontAlignY=65&animation=fadeIn" width="100%"/>

</div>
