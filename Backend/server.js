const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()

const connectDB=require("./config/db")

const authRoutes=require("./routes/authRoutes")
const projectRoutes=require("./routes/projectRoutes")
const deploymentRoutes=require("./routes/deploymentRoutes")

const app=express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth",authRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/deployments",deploymentRoutes)

app.get("/",(req,res)=>{
res.send("DockStack DevOps API Running")
})

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})