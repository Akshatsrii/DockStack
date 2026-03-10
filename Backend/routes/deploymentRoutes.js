const express=require("express")
const router=express.Router()

const {deployProject,getDeployments}=require("../controllers/deploymentController")
const auth=require("../middleware/authMiddleware")

router.post("/",auth,deployProject)
router.get("/",auth,getDeployments)

module.exports=router