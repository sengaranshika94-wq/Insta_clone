import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'
const Nav = () => {
    const navigate = useNavigate()
  return (
    <nav className='nav-bar' >
        <p>InstaClone</p>
        <button className='button primary-button' onClick={() => navigate('/create-post')}>New Post</button>
    </nav>
  )
}

export default Nav