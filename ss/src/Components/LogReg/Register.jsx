import React from 'react'
import './Register.css'
import { useNavigate } from "react-router-dom";

const Register = () => {

  const router = useNavigate();

  return (
    <div id='register'>
        <div>
        <h1>Sign up </h1>
        <p>for tailored experience</p>
        </div>
        <div id='forms'>
         <form>
            <input type='text' placeholder='Enter Name*'/><br/>
            <input type='email' placeholder='Enter Email ID*'/><br/>
            <input type='password' placeholder='Enter Password*'/><br/>
            <button>Register</button>
         </form>
        </div>
        <div>
            <p>Register using</p>
            <div>
            <i class="fa-brands fa-facebook-f fa-xl"></i>
            <i class="fa-brands fa-google fa-xl"></i>
            </div>
        </div>
        <div>
          <p>Already have an account?<b onClick={() => router('/login')}> Login</b></p>
        </div>
        <div>
            <p>By signing up you agree to our <b> Terms of Service </b>&<b> Privacy Policy</b> </p>
            </div>
    </div>
  )
}

export default Register