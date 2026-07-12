<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0f,30:0d1117,60:1a1f35,100:0f3460&height=220&section=header&text=DockStack&fontSize=90&fontColor=00d4ff&fontAlignY=40&desc=Full%20Stack%20DevOps%20Deployment%20Platform&descSize=24&descAlignY=63&descColor=7dd3fc&animation=fadeIn" width="100%"/>

<br/>

<p>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
</p>
<p>
  <img src="https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
</p>

<br/>

<p>
  <img src="https://img.shields.io/github/stars/Akshatsrii/DockStack?style=social"/>
  &nbsp;
  <img src="https://img.shields.io/github/forks/Akshatsrii/DockStack?style=social"/>
  &nbsp;
  <img src="https://img.shields.io/badge/License-MIT-00d4ff?style=flat"/>
  &nbsp;
  <img src="https://img.shields.io/badge/PRs-Welcome-7dd3fc?style=flat"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Status-Active-00ff88?style=flat"/>
</p>

<br/>

<blockquote>
<b>DockStack</b> is a production-grade DevOps platform that simplifies containerized deployments using Docker, Nginx, Terraform, Ansible, and GitHub Actions — all wired into one centralized pipeline.
</blockquote>

</div>

---

## 📌 Table of Contents

- [🚨 Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [🏗️ System Architecture](#️-system-architecture)
- [🧰 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🐳 Docker Setup](#-docker-setup)
- [☁️ Infrastructure Setup (Terraform)](#️-infrastructure-setup-terraform)
- [🤖 Server Configuration (Ansible)](#-server-configuration-ansible)
- [🔄 CI/CD Pipeline](#-cicd-pipeline)
- [🚀 Step-by-Step Deployment Guide](#-step-by-step-deployment-guide)
- [🔐 Authentication](#-authentication)
- [📊 Features](#-features)
- [🔮 Future Improvements](#-future-improvements)
- [👨‍💻 Author](#-author)
- [🤝 Contributing](#-contributing)

---

## 🚨 Problem Statement

Modern application deployment involves multiple steps and tools. Managing them manually is **time-consuming, error-prone, and overwhelming** — especially for developers new to DevOps.

<div align="center">

| ❌ Pain Point | 😩 Impact |
|:-------------|:---------|
| Manual Docker container setup | Time wasted on repetitive config |
| Complex server configuration | High chance of human error |
| No centralized deployment management | Scattered tools, no visibility |
| Difficult CI/CD pipeline setup | Slow release cycles |

</div>

---

## 💡 Solution

**DockStack** provides a centralized DevOps platform that integrates all these tools into one seamless workflow.

```
✅  Manage projects from a unified dashboard
✅  Deploy applications using Docker containers
✅  Route traffic with Nginx reverse proxy
✅  Provision cloud infrastructure with Terraform
✅  Configure servers automatically with Ansible
✅  Automate every deployment with GitHub Actions
```

---

## 🏗️ System Architecture

<div align="center">

```mermaid
flowchart TD
    U([🌐 User Browser]) --> N

    subgraph APP ["⚡ Application Layer"]
        N[🔀 Nginx\nReverse Proxy :80]
        N --> FE[⚛️ React + Vite\nFrontend]
        N --> BE[🟢 Node.js + Express\nBackend API]
        BE --> DB[(🍃 MongoDB\nDatabase)]
    end

    subgraph INFRA ["🏗️ Infrastructure Layer"]
        TF[🌍 Terraform\nCloud Provisioning]
        AN[🤖 Ansible\nServer Configuration]
        TF --> AN
    end

    subgraph CICD ["🔄 CI/CD Layer"]
        GH[📦 GitHub Push]
        GA[⚙️ GitHub Actions]
        GH --> GA
        GA -->|SSH + Deploy| APP
    end

    INFRA -->|Prepares Server| APP

    style APP fill:#0d2137,stroke:#00d4ff,color:#7dd3fc
    style INFRA fill:#1a0a2e,stroke:#7B42BC,color:#c4b5fd
    style CICD fill:#0a1f0a,stroke:#16a34a,color:#bbf7d0
```

</div>

---

## 🧰 Tech Stack

<div align="center">

### 🖥️ Frontend

| Technology | Purpose |
|:----------:|:--------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | UI Component Library |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Lightning-fast Bundler |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP Client |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Client-side Routing |

### 🔧 Backend

| Technology | Purpose |
|:----------:|:--------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | JavaScript Runtime |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | REST API Framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | NoSQL Database |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Authentication |

### 🛠️ DevOps

| Technology | Purpose |
|:----------:|:--------|
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerization |
| ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white) | Multi-container Orchestration |
| ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white) | Reverse Proxy |
| ![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white) | Infrastructure as Code |
| ![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=flat-square&logo=ansible&logoColor=white) | Server Automation |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) | CI/CD Automation |

</div>

---

## 📁 Project Structure

```
DockStack/
│
├── 🟢 Backend/
│   ├── server.js                    ← App entry point
│   ├── package.json
│   ├── .env                         ← Environment variables
│   │
│   ├── config/
│   │   └── db.js                    ← MongoDB connection
│   │
│   ├── models/
│   │   ├── User.js                  ← User schema
│   │   ├── Project.js               ← Project schema
│   │   └── Deployment.js            ← Deployment schema
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── deploymentController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js        ← JWT verification
│   │
│   └── routes/
│       ├── authRoutes.js
│       ├── projectRoutes.js
│       └── deploymentRoutes.js
│
├── ⚛️  Frontend/
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Projects.jsx
│       │   └── Profile.jsx
│       ├── services/
│       │   └── api.js               ← Axios API config
│       └── context/
│           └── AuthContext.jsx      ← Global auth state
│
├── 🔀 nginx/
│   └── default.conf                 ← Reverse proxy rules
│
├── 🐳 docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml           ← Orchestrates Frontend, Backend, MongoDB, Nginx
│
├── 🌍 terraform/
│   ├── main.tf                      ← Cloud resource definitions (AWS EC2 instance)
│   └── variables.tf
│
├── 🤖 ansible/
│   └── setup.yml                    ← Playbook to install & configure Docker
│
└── 🔄 .github/
    └── workflows/
        └── deploy.yml               ← CI/CD pipeline (triggers build & SSH deploy)
```

---

## ⚙️ Installation & Setup

### Prerequisites

> Make sure these are installed before you begin.

![Git](https://img.shields.io/badge/Git-Required-F05032?style=flat&logo=git&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-v20+-339933?style=flat&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Required-2496ED?style=flat&logo=docker&logoColor=white)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Akshatsrii/DockStack.git
cd DockStack
```

### 2️⃣ Backend Setup (Local Development)

```bash
cd Backend
npm install
# Configure local environment in .env
npm run dev
```

> 🟢 Backend API running locally at `http://localhost:5000`

### 3️⃣ Frontend Setup (Local Development)

```bash
cd Frontend
npm install
npm run dev
```

> ⚛️ Frontend running locally at `http://localhost:3000` (API calls proxied to `http://localhost:5000` automatically)

---

## 🐳 Docker Setup

> Run the **entire platform** — Frontend, Backend, MongoDB, and Nginx — with a single command.

```bash
docker-compose -f docker/docker-compose.yml up --build
```

<div align="center">

| Container | Service | Port | External Port |
|:----------|:--------|:----:|:-------------:|
| 🔀 nginx | Reverse Proxy | `80` | `80` |
| ⚛️ frontend | React App (Vite) | `3000` | `3000` (routed via nginx on 80) |
| 🟢 backend | Express API | `5000` | `5000` (routed via nginx/api on 80) |
| 🍃 mongo | MongoDB | `27017` | `27017` |

</div>

> 🌐 Open `http://localhost` in your browser — Nginx routes all frontend requests and backend `/api` requests automatically.

---

## ☁️ Infrastructure Setup (Terraform)

> Provisions an AWS EC2 server ready for Docker deployments.

```bash
# Move into terraform directory
cd terraform

# Initialize Terraform providers
terraform init

# Preview what will be created
terraform plan

# Provision the server
terraform apply
```

```
✅  Apply complete!
✅  Resources: 1 added, 0 changed, 0 destroyed.
```
*Note: Write down the public IP of the newly provisioned instance.*

---

## 🤖 Server Configuration (Ansible)

> Automatically installs and configures Docker on your remote server.

### 1. Create an Inventory File
Create a file named `ansible/inventory.ini` and add your server details:
```ini
[servers]
your_ec2_public_ip ansible_user=ubuntu ansible_ssh_private_key_file=/path/to/your-key.pem
```

### 2. Run the Playbook
```bash
ansible-playbook -i ansible/inventory.ini ansible/setup.yml
```

```yaml
# What setup.yml does:
  ✔  Installs Docker and starts the Docker daemon
  ✔  Ensures docker starts on server boot
```

---

## 🔄 CI/CD Pipeline

> Push to the `main` branch → app is deployed to the server automatically. **Zero manual steps.**

```mermaid
sequenceDiagram
    participant Dev as 👨‍💻 Developer
    participant GH  as 📦 GitHub
    participant GA  as ⚙️ GitHub Actions
    participant SRV as 🖥️ Cloud Server

    Dev->>GH: git push origin main
    GH->>GA: Trigger deploy.yml workflow
    GA->>GA: 🛠️ Verify Build Locally
    GA->>SRV: 📡 SSH into server via appleboy/ssh-action
    SRV->>SRV: 📥 git pull latest changes
    SRV->>SRV: 🐳 docker-compose down & up --build -d
    SRV-->>Dev: ✅ Deployment successful & active!
```

---

## 🚀 Step-by-Step Deployment Guide

Here is how you can deploy your application to a live server step-by-step:

### Step 1: Provision the Server (Terraform)
1. Navigate to the `terraform/` directory.
2. Initialize and apply the configuration as shown in the [Infrastructure Setup](#️-infrastructure-setup-terraform) section.
3. Keep track of the `Public IP` of your new server and download your AWS SSH private key file (`.pem`).

### Step 2: Install Docker on the Server (Ansible)
1. Add your server's IP address and the path to your SSH private key file (`.pem`) to `ansible/inventory.ini`.
2. Run the ansible playbook to install Docker:
   ```bash
   ansible-playbook -i ansible/inventory.ini ansible/setup.yml
   ```

### Step 3: Configure GitHub Repository Secrets
To enable automated deployments via GitHub Actions, go to your GitHub repository settings under **Settings > Secrets and variables > Actions** and add the following repository secrets:

| Secret Name | Value | Example |
| :--- | :--- | :--- |
| `SERVER_IP` | The public IP address of your provisioned server | `13.233.111.22` |
| `SSH_USER` | The default username of your OS image (e.g., Ubuntu) | `ubuntu` |
| `SSH_PRIVATE_KEY` | The entire text content of your `.pem` SSH private key | `-----BEGIN RSA PRIVATE KEY----- ...` |

### Step 4: Push to Main to Trigger Deploy
Once your secrets are set up:
1. Commit any changes to your code.
2. Push to the main branch:
   ```bash
   git add .
   git commit -m "deploy: configure production"
   git push origin main
   ```
3. GitHub Actions will trigger, SSH into your server, clone the repository, spin up the Docker containers, and set up Nginx reverse proxy routing. Your app will then be accessible at `http://<SERVER_IP>`.

---

## 🔐 Authentication

> JWT-based authentication secures all protected routes.

```
POST /api/auth/register   →  Create a new account
POST /api/auth/login      →  Login & receive JWT token
GET  /api/projects        →  🔒 Protected (token required)
GET  /api/deployments     →  🔒 Protected (token required)
```

```
Client ──── POST /login ────▶ Server
             ◀── JWT Token ────
Client ──── Authorization: Bearer <token> ──▶ Protected Routes
```

---

## 📊 Features

<div align="center">

| Feature | Status |
|:--------|:------:|
| 🔐 JWT User Authentication | ✅ Done |
| 📂 Project Management Dashboard | ✅ Done |
| 🚀 Deployment Tracking | ✅ Done |
| 🐳 Dockerized Services | ✅ Done |
| 🔀 Nginx Reverse Proxy | ✅ Done |
| 🌍 Infrastructure as Code (Terraform) | ✅ Done |
| 🤖 Server Automation (Ansible) | ✅ Done |
| 🔄 CI/CD with GitHub Actions | ✅ Done |

</div>

---

## 🔮 Future Improvements

```
🔜  Kubernetes Deployment         — Container orchestration at scale
🔜  Real-time Deployment Logs     — Live streaming log output
🔜  Prometheus & Grafana          — Metrics, dashboards & alerting
🔜  GitHub Repository Integration — One-click repo imports
🔜  Automatic Container Scaling   — Load-based autoscaling
🔜  Role-Based Access Control     — Fine-grained permissions
```

---

## 👨‍💻 Author

<div align="center">

### Akshat Srivastava

**B.Tech IT Engineering Student**
*DevOps & Full Stack Development Enthusiast*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Akshatsrii)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yourusername)

*Built with ❤️, countless `docker compose up` attempts, and way too much coffee ☕*

</div>

---

## 🤝 Contributing

Contributions are always welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## 📜 License

This project is open-source and available under the **MIT License**.

```
MIT License — Free to use, modify, and distribute with attribution.
```

---

<div align="center">

⭐ **Found this project helpful? Drop a star — it means a lot!** ⭐

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f3460,40:1a1f35,70:0d1117,100:0a0a0f&height=150&section=footer&text=Keep%20Shipping%20🚀&fontSize=30&fontColor=00d4ff&fontAlignY=65&animation=fadeIn" width="100%"/>

</div>
