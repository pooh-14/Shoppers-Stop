import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" })
    const router = useNavigate();
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      if (userData.email && userData.password) {
          const users = JSON.parse(localStorage.getItem("Users")); 

          var flag = false;
          for (var i = 0; i < users.length; i++) {
            if (users[i].email == userData.email && users[i].password == userData.password) {
              flag = true;
          }
          }

          if (flag == false) {
              return alert("Please check credentails.")
          }
          alert("Login successfull.");
          setUserData({ email: "", password: "" })
          router('/');
          
      } else {
          alert("Please fill all the details! ")
      }
  }
  return (
    <div id='login'>
        <div>
        <h1>Log in </h1>
        <p>for tailored experience</p>
        </div>
        <div id='forms2'>
         <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type='email' name='email' placeholder='Enter Email ID*'/><br/>
            <input onChange={handleChange} type='password' name='password' placeholder='Enter Password*'/><br/>
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