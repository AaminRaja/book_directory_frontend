import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to='/searching'>Search Books</Link>
      <Link to='/sidebar'>Select Author and Category</Link>
    </nav>
  )
}

export default NavBar
