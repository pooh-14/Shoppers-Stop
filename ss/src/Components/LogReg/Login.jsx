import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  

  const router = useNavigate();
  return (
    <div id='login'>
        <div>
        <h1>Log in </h1>
        <p>for tailored experience</p>
        </div>
        <div id='forms2'>
         <form>
            <input type='email' placeholder='Enter Email ID*'/><br/>
            <input type='password' placeholder='Enter Password*'/><br/>
            <button>Login</button>
         </form>
        </div>
        <div>
            <p>Login using</p>
            <div>
            <i class="fa-brands fa-facebook-f fa-xl"></i>
            <i class="fa-brands fa-google fa-xl"></i>
            </div>
        </div>
        <div>
            <p>New User? <b onClick={() => router('/register')}> Register </b></p>
            </div>
    </div>
  )
}

export default Login