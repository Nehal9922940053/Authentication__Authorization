import React, {useState} from 'react'
import './LoginPage.css'
import {Grid} from "@mui/material"
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();

axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login',{email,password})
    .then(result => {
      console.log(result);
      if(result.data === 'Success'){
         navigate('/');
      }
    })
    .catch( err => console.log(err))
  }






  return (
    <div>
    <Grid container>
   



    <Grid item xs={11}>
    <div className="main_loginpage">
    <div className="rightcomponent_loginpage">
    <h1>Login Page</h1>
   
   
   
    <form className="form" onSubmit={handleSubmit}>
    <input type="email"  className="inp" name="email"
    placeholder="Email"  
    onChange={(e)=>setEmail(e.target.value)}
    />

  <input type='password' className="inp" name='password' id='password' placeholder='Password'    
  onChange={(e)=>setPassword(e.target.value)}
    />     
   
<button className="btn" href="">Sign In</button>
</form>
  
  
    
  <div className="rightcomponent_signuplink">

     <div className="signin_login_opt">
        <div className="dnt_acct">
        Don't have an account? <span><a href="/signup">Sign up</a></span>
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

export default LoginPage