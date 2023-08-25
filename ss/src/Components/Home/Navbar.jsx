
import { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {

  const [user, setUser] = useState({});
  const router = useNavigate();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      setUser(state.user);
    }
  }, [state]);

  return (
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
          <i onClick={() => router('/register')} class="fa-regular fa-circle-user fa-lg"></i>
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
  )
}

export default Navbar