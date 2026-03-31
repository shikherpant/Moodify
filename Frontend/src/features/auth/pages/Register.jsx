import { useState } from "react"
import FormGroup from "../components/FormGroup"
import "../styles/register.scss"
import {Link} from "react-router"
import { useAuth } from "../hooks/useAuth"

const Register = () => {

  const {handleRegister} = useAuth()

  const [username,setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    await handleRegister(email, username, password)
  }

  return (
    <main className='register-page'>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup 
            label="Username" 
            placeholder="Enter your username" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}/>  
          <FormGroup 
            label="Email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
          <FormGroup 
            label="Password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
          <button className="button" type="submit">Register</button>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </main>   
  )
}

export default Register