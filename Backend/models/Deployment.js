const mongoose=require("mongoose")

const deploymentSchema=new mongoose.Schema({
project:{
type:mongoose.Schema.Types.ObjectId,
ref:"Project"
},
status:{
type:String,
default:"pending"
},
logs:String
},{timestamps:true})

module.exports=mongoose.model("Deployment",deploymentSchema)