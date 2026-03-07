import {useState} from "react"

function Register(){

const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")

const register=async()=>{

await fetch("/api/auth/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name,email,password})
})

}

return(
<div>
<h2>Register</h2>
<input placeholder="name" onChange={(e)=>setName(e.target.value)}/>
<input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
<input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
<button onClick={register}>Register</button>
</div>
)

}

export default Register