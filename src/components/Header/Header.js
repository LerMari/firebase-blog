import React, { useTransition } from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { FaHome } from "react-icons/fa"
import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'

function Header() {

  //get user date
  const [user] = useAuthState(auth);
  console.log("user data", user)

  //array for topics
  const categories = ["Health", "Food", "Travel", "Tech"]


  return (
    <div className="header-container">
            <FaHome />
        <div className="categories-container">
            {
                categories.map((item, index) => <Link to={`/category/${item}
                `} className="nav-link" key={index}> {item}</Link>)
            }
        </div>
        {
          user?
          <div>
            <span className="username">
              Hello, {user.displayName? user.displayName: user.email}!
            </span>
          </div>
          :
          <button className="auth-link">SignUp</button>

        }
        
    </div>
  )
}

export default Header