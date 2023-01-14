import React, { useTransition } from 'react'
import './Header.css'
import {Link, useNavigate} from 'react-router-dom'
import { FaHome } from "react-icons/fa"
import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'

function Header() {
  let navigate = useNavigate();

  //get user date
  const [user] = useAuthState(auth);
  console.log("user data", user)

  //array for topics
  const categories = ["Health", "Food", "Travel", "Tech"]


  return (
    <div className="header-container">
            <FaHome onClick={()=>navigate('/')}/>
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
            <button className="auth-link"
                    onClick={()=>signOut(auth)}>Logout</button>
          </div>
          :
          <Link to='/auth' className="auth-link">SignUp</Link>

        }
        
    </div>
  )
}

export default Header