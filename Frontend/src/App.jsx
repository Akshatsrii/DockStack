import {useEffect,useState} from "react"

function App(){

const[data,setData]=useState("Loading")

useEffect(()=>{
fetch("/api/health")
.then(res=>res.json())
.then(data=>setData(data.status))
},[])

return(
<div>
<h1>DockStack DevOps Project</h1>
<h2>{data}</h2>
</div>
)

}

export default App