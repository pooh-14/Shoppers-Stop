import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import api from "../ApiConfig";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer" })
  const { state, dispatch } = useContext(AuthContext)


  const router = useNavigate()

  const handleChange = (event) => {
      setUserData({ ...userData, [event.target.name]: event.target.value })
  }
  const selectRole = (event) => {
      setUserData({ ...userData, "role": event.target.value })
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role) {
          if (userData.password === userData.confirmPassword) {
              const response = await api.post("/register", { userData });
              
              if (response.data.success) {
                console.log(userData, "userData")
                  setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer" })
                  router('/login')
                  toast.success(response.data.message)
              } else {
                  toast.error(response.data.message)
              }

          } else {
              toast.error("Password and Confirm Password not Matched.")
          }
      } else {
          toast.error("All fields are mandtory.")
      }
  }
  console.log(userData, "userData")

  useEffect(() => {
      if (state?.user?.name) {
          router('/')
      }
  }, [state])

  return (
    <div id="register">
      <div>
        <h1>Sign up </h1>
        <p>for tailored experience</p>
      </div>
      <div id="forms">
        <form onSubmit={handleSubmit}>
        <label>Select Role :</label>
              <select onChange={selectRole}>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
              </select>
              <br />
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter Name*"
          />
          <br />
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Email ID*"
          />
          <br />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Password*"
          />
          <br />
              <br />
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password*"
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
          Already have an account?<b> Login</b>
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
