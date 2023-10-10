// import React, { useContext, useEffect, useState } from 'react'
// import './Login.css'
// import { useNavigate } from 'react-router-dom';
// // import { AuthContext } from '../../Context/AuthContext';
// import { toast } from "react-hot-toast";
// import axios from 'axios';

// const Login = () => {
//     const [userData, setUserData] = useState({ email: "", password: "" });

//     // const { state, dispatch } = useContext(AuthContext);
//     const router = useNavigate();
  
//     const handleChange = (event) => {
//       setUserData({ ...userData, [event.target.name]: event.target.value });
//     };
  
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       if (userData.email && userData.password) {
//           var flag = false;
//           const allUsers = JSON.parse(localStorage.getItem("Users"));
//           for (var i = 0; i < allUsers.length; i++) {
//               if (allUsers[i].email == userData.email && allUsers[i].password == userData.password) {
//                   localStorage.setItem("Current-user", JSON.stringify(allUsers[i]))
//                   setUserData({ email: "", password: "" })
//                   toast.success("Login Successfull.")
//                   router('/')
//                   flag = true;
//                   break;
//               }
//           }
//           if (flag == false) {
//               toast.error("Please Check your email & password.")
//           }

//       } else {
//           toast.error("Please fill the all fields.")
//       }}
//     // console.log(userData, "userData")
  
//     // useEffect(() => {
//     //   if (state?.user?.name) {
//     //     router("/");
//     //   }
//     // }, [state]);

//   return (
    
//   )
// }

// export default Login