//ui_layer 

import {useState} from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router'

const Login = () => {
    const {user, loading, handleLogin}= useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        await handleLogin(username,password)
        navigate('/')
        
    }
    if(loading){
      return(
        <main>
          <h1>Loading...</h1>
        </main>
      )
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
           <form onSubmit={handleSubmit} >
            <input 
              onInput={(e)=>{setUsername(e.target.value)}}
              type="text" 
              name="username" 
              id="username" 
              placeholder='Enter username' />
            <input 
              onInput={(e)=>{setPassword(e.target.value)}}
              type="text" 
              name="pasword" 
              id="password" 
              placeholder='Enter password' />
            <button className='button primary-button'>Login</button>
           </form>
           <p>Don't have an account?<Link to={'/register'}> Create one.</Link></p>
        </div>
    </main>
  )
}

export default Login