import React, {useState} from 'react'
import "./SignupPage.css"
import { Grid } from '@mui/material'
import axios from 'axios';
import {useNavigate} from "react-router-dom"


const SignupPage = () => {

  const [username, setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup',{username,email,password})
    .then(result => {console.log(result)
    navigate('/')
    })
    .catch( err => console.log(err))
  }


  return (
    <div>
    <Grid container>
   
    <Grid item xs={11}>
    <div className="main_signuppage">
    <div className="maincomponent_signuppage">
    <h1>Signup Page</h1>
    <form className="form" onSubmit={handleSubmit}>
   
    <input type="text"  className="inp" placeholder="Username" name="username" 
    onChange={(e)=>setUsername(e.target.value)}
    /> 
    <input type="email"  className="inp" id="email" placeholder="Email" name="email"

    onChange={(e)=>setEmail(e.target.value)}
    />
    <input type="password" className="inp" placeholder="Password" name="password" 

    onChange={(e)=>setPassword(e.target.value)}
    />
    <button className="btn" href="">Sign up</button>
    </form>
      
      <div className="maincomponent_loginlink">
    <div className="signup_login_opt">
       <div className="have_acct">
       Have an account? <span><a href='/login'>Log in</a></span>
       </div>

    
    </div>
    </div>

   

 </div>
    </div>  
    
    </Grid>
    

    </Grid>
    </div>
  )
}

export default SignupPage