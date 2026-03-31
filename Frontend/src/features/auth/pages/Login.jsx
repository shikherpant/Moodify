import { useState } from "react"
import FormGroup from "../components/FormGroup"
import "../styles/login.scss"
import {Link, useNavigate} from "react-router"
import { useAuth } from "../hooks/useAuth"

const Login = () => {

  const {handleLogin} = useAuth()
  const navigate = useNavigate()
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    await handleLogin(email, username, password)
    navigate("/")
  }

  return (
    <main className='login-page'>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup 
            label="Email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}} />
          <FormGroup 
            label="Password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
          <button className="button" type="submit">Login</button>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login