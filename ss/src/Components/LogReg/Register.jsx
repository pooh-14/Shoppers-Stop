import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if(userData.name && userData.email && userData.password){
        const array = JSON.parse(localStorage.getItem("Users")) || [];
        const userDataObj = {
             name:userData.name ,
             email:userData.email ,
             password:userData.password,
             cart : []
            };
        array.push(userDataObj);
        localStorage.setItem("Users", JSON.stringify(array));
        alert("Registeration Successfull..")
        router('/login')
    }else {
        alert("Please fill all the details!")
}
}

  return (
    <div id="register">
      <div>
        <h1>Sign up </h1>
        <p>for tailored experience</p>
      </div>
      <div id="forms">
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" name='name'  placeholder="Enter Name*" />
          <br />
          <input
            onChange={handleChange}
            type="email" name='email' 
            placeholder="Enter Email ID*"
          />
          <br />
          <input
            onChange={handleChange}
            type="password" name='password' 
            placeholder="Enter Password*"
          />
          <br />
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
        <p>
          Already have an account?<b onClick={() => router("/login")}> Login</b>
        </p>
      </div>
      <div>
        <p>
          By signing up you agree to our <b> Terms of Service </b>&
          <b> Privacy Policy</b>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
