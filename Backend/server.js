const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const connectDB=require("./config/db")
const authRoutes=require("./routes/authRoutes")

dotenv.config()

const app=express()

connectDB()

app.use(cors())
app.use(express.json())

app.get("/api/health",(req,res)=>{
res.json({status:"Server running"})
})

app.use("/api/auth",authRoutes)

app.listen(5000)