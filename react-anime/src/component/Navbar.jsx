import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar(){
  return (
    <nav className="app-navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">Logo</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">猜你喜欢</Link>
        <Link to="/anime" className="nav-link">动画</Link>
        <Link to="/redux" className="nav-link">redux</Link>
        {/* 未来可添加更多链接 */}
      </div>
    </nav>
  )
}
