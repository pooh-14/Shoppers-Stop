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
          var flag = false;
          const allUsers = JSON.parse(localStorage.getItem("Users"));
          for (var i = 0; i < allUsers.length; i++) {
              if (allUsers[i].email == userData.email && allUsers[i].password == userData.password) {
                  localStorage.setItem("Current-user", JSON.stringify(allUsers[i]))
                  setUserData({ email: "", password: "" })
                  alert("Login Successfull.")
                  router('/')
                  flag = true;
                  break;
              }
          }
          if (flag == false) {
              alert("Please Check your email & password.")
          }

      } else {
          alert("Please fill the all fields.")
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