
import { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
// import { AuthContext } from '../../Context/AuthContext';
import '../LogReg/Login.css'

const Navbar = () => {

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({});
  const router = useNavigate();
  // const { state } = useContext(AuthContext);

  const [isActive, setIsActive] = useState(false);

  const toggleLoginForm = () => {
    setIsActive(!isActive);
  };

 

   
  
    const handleChange = (event) => {
      setUserData({ ...userData, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (userData.email && userData.password) {
          var flag = false;
          const allUsers = JSON.parse(localStorage.getItem("Users"));
          for (var i = 0; i < allUsers.length; i++) {
              if (allUsers[i].email == userData.email && allUsers[i].password == userData.password) {
                  localStorage.setItem("Current-user", JSON.stringify(allUsers[i]))
                  setUserData({ email: "", password: "" })
                  toast.success("Login Successfull.")
                  router('/')
                  flag = true;
                  break;
              }
          }
          if (flag == false) {
              toast.error("Please Check your email & password.")
          }

      } else {
          toast.error("Please fill the all fields.")
      }}

  // useEffect(() => {
  //   if (state) {
  //     setUser(state.user);
  //   }
  // }, [state]);

  return (
    <div>
      <div className='btmbrdr'>
      {/* <div class="loadingio-spinner-bars-qusjja94299"><div class="ldio-5m4rxymmg8a">
<div></div><div></div><div></div><div></div>
</div></div> */}
      <div id='first'>
        <div id='onez'>
          <div>
            <p>First Citizen Club</p>
            <p>All Stores</p>
            <p>Help & Support</p>
          </div>
          <div>
            <img onClick={()=>router('/')} src='https://prodstatic.shoppersstop.com/_ui/updated_path/images/shopperstopimgaes_web/rectangle_logo_black.svg'/>
          </div>
          <div>
            <input placeholder='Shop products & brands'/>
            <i class="fa-solid fa-magnifying-glass fa-lg"></i>
          </div>
          <div>
          <i class="fa-regular fa-heart fa-lg"></i>
          <i onClick={()=>router('/cart')} class="fa-solid fa-bag-shopping fa-lg"></i>
          <i onClick={toggleLoginForm} class="fa-regular fa-circle-user fa-lg"></i>
          </div>
        </div>
      </div>
      <div id='second'>
        <p onClick={()=>router('/multiple')}>CATEGORIES</p>
        <p>LUXE</p>
        <p>BARGAINS</p>
        <p>STYLE HUB</p>
      </div>
      <div id='third'>
        <p>MEN</p>
        <p>WOMEN</p>
        <p>BEAUTY</p>
        <p>WATCHES</p>
        <p>KIDS</p>
        <p>HOMESTOP</p>
        <p>GIFTS</p>
        <p>BRANDS</p>
      </div>
      

    </div>
    {/* -------------------------------****----------------------------- */}

    <div id='login' className={`login-form ${isActive ? 'active' : ''}`}>
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
    </div>
  )
}

export default Navbar