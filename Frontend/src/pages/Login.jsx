import {useState} from "react"
import api from "../services/api"

function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleSubmit=async(e)=>{
e.preventDefault()
await api.post("/auth/login",{email,password})
}

return(
<form onSubmit={handleSubmit}>
<h2>Login</h2>
<input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
<input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
<button>Login</button>
</form>
)
}

export default Login