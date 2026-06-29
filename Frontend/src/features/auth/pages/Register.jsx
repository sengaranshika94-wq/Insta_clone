//ui_layer

import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
const Register = () => {
    const handleSubmit= (e)=>{
        e.preventDefault()
    }
   return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
           <form onSubmit={handleSubmit} >
            <input type="text" name="username" id="username" placeholder='Enter username' />
            <input type="text" name='email' id='email' placeholder='Enter email' />
            <input type="text" name="pasword" id="password" placeholder='Enter password' />
            <button className='button primary-button'>Register</button>
           </form>
           <p>Already have an account?<Link to={'/login'}> Login to Account</Link></p>
        </div>
    </main>
  )
}

export default Register