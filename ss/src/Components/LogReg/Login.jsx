import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from "react-hot-toast";
import axios from 'axios';

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });

    const { state, dispatch } = useContext(AuthContext);
    const router = useNavigate();
  
    const handleChange = (event) => {
      setUserData({ ...userData, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (userData.email && userData.password) {
        const response = await axios.post("http://localhost:8003/login", {
          userData,
        });
        if (response.data.success) {
          dispatch({
            type: "LOGIN",
            payload: response.data.user,
          });
          localStorage.setItem("token", JSON.stringify(response.data.token));
          setUserData({ email: "", password: "" });
          router("/");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("All fields are mandtory.");
      }
    };
    // console.log(userData, "userData")
  
    useEffect(() => {
      if (state?.user?.name) {
        router("/");
      }
    }, [state]);

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