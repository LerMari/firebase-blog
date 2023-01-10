import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { FaHome } from "react-icons/fa"

function Header() {
        //array for topics
        const categories = ["Health", "Food", "Travel", "Tech"]


  return (
    <div className="header-container">
            <FaHome />
        <div className="categories-container">
            {
                categories.map(item => <Link to={`/category/${item}
                `} className="nav-link"> {item}</Link>)
            }
        </div>
        
        <button className="auth-link">SignUp</button>
    </div>
  )
}

export default Header