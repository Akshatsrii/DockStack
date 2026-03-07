import {useState} from "react"

function Login(){

const[email,setEmail]=useState("")
const[password,setPassword]=useState("")

const login=async()=>{

await fetch("/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email,password})
})

}

return(
<div>
<h2>Login</h2>
<input onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
<input onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
<button onClick={login}>Login</button>
</div>
)

}

export default Login