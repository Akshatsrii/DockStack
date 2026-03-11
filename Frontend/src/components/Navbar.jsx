import {Link} from "react-router-dom"

function Navbar(){
return(
<nav style={{padding:"10px",background:"#111",color:"#fff"}}>
<Link to="/dashboard">Dashboard</Link> |
<Link to="/projects">Projects</Link> |
<Link to="/profile">Profile</Link>
</nav>
)
}

export default Navbar