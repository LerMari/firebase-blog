import React from 'react'
import './Auth.css'
import {auth} from '../../config/firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Auth() {

let navigate=useNavigate();

const [existingUser, setExistingUser] = React.useState(false)

//create state for for data
const [email, setEmail] = React.useState("")
const [password, setPassword] = React.useState("")
const [name, setName] = React.useState("")

const handleSignup = (e) => {
    e.preventDefault();
    console.log("signup")
    //connectto firebase auth
    createUserWithEmailAndPassword(auth, email, password)
    .then(res =>{
        console.log(res.user)
        //add name as username
        updateProfile(auth.currentUser, {
            displayName: name
        })
        //navigate to homepage
        navigate('/')
    })
    .catch(err=>{
        alert(err.code)
    })
}

const handleLogin = (e) => {
    e.preventDefault();
    console.log("login")
    //login
    signInWithEmailAndPassword(auth, email, password)
    .then (res => {
        console.log(res)
        //navigate to homepage
        navigate('/')
    })
    .catch(err =>{
        alert(err.com)
    })
}

  return (
    <div className="auth-container">
        {
            existingUser?
            <form className="auth-form" onSubmit={handleLogin}>
                <h1>Login with your email</h1>
                <div className="form-group">
                    <input  type="email"
                            placeholder="Enter email"
                            required 
                            onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input  type="password"
                            placeholder="Enter password"
                            required 
                            onChange={(e)=>{setPassword(e.target.value)}}/>        
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account?
                    <span className="form-link"
                          onClick={()=>setExistingUser(false)}>Signup</span></p>
            </form>
            :
            <form className="auth-form" onSubmit={handleSignup}>
                <h1>Signup</h1>
                <div className="form-group">
                <input  type="text"
                            placeholder="Your name"
                            required
                            onChange={(e)=>{setName(e.target.value)}} />
                <input  type="email"
                            placeholder="Enter email"
                            required 
                            onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input  type="password"
                            placeholder="Enter password"
                            required 
                            onChange={(e)=>{setPassword(e.target.value)}}/>        
                </div>
                <button type="submit">Register</button>
                <p>Already have an account?
                    <span className="form-link"
                          onClick={()=>setExistingUser(true)}>Login</span></p>
            </form>
            
        }
    </div>
  )
}

export default Auth