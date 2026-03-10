const Project=require("../models/Project")

exports.createProject=async(req,res)=>{
try{

const {name,repoUrl}=req.body

const project=await Project.create({
name,
repoUrl,
owner:req.user.id
})

res.json(project)

}catch(error){
res.status(500).json({error:error.message})
}
}

exports.getProjects=async(req,res)=>{
try{

const projects=await Project.find({owner:req.user.id})

res.json(projects)

}catch(error){
res.status(500).json({error:error.message})
}
}