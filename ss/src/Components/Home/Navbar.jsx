import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { AuthContext } from '../../Context/AuthContext';
import "../LogReg/Login.css";
import api from "../ApiConfig";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({});
  const router = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  const [isActive, setIsActive] = useState(false);

  const openLoginForm = () => {
    setIsActive(true);
  };

  const closeLoginForm = () => {
    setIsActive(false);
  };

  // ------------------------------**MensDrop**------------------------------

  const [display, setdisplay] = useState(false);

  const dropDown = () => {
    setdisplay(true);
  };

  const dropUp = () => {
    setdisplay(false);
  };

  // ------------------------------**MensDrop**------------------------------

  // ------------------------------**Login**------------------------------

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      const response = await api.post("/login", { userData });
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

  // ------------------------------**Login**------------------------------

  // ------------------------------**Register**------------------------------

  return (
    <div>
      <div className="btmbrdr">
        {/* <div class="loadingio-spinner-bars-qusjja94299"><div class="ldio-5m4rxymmg8a">
<div></div><div></div><div></div><div></div>
</div></div> */}
        <div id="first">
          <div id="onez">
            <div>
              <p>First Citizen Club</p>
              <p>All Stores</p>
              <p>Help & Support</p>
            </div>
            <div>
              <img
                onClick={() => router("/")}
                src="https://prodstatic.shoppersstop.com/_ui/updated_path/images/shopperstopimgaes_web/rectangle_logo_black.svg"
              />
            </div>
            <div>
              <input placeholder="Shop products & brands" />
              <i class="fa-solid fa-magnifying-glass fa-lg"></i>
            </div>
            <div>
              <i class="fa-regular fa-heart fa-lg"></i>
              <i
                onClick={() => router("/cart")}
                class="fa-solid fa-bag-shopping fa-lg"
              ></i>
              <i
                onClick={openLoginForm}
                class="fa-regular fa-circle-user fa-lg"
              ></i>
            </div>
          </div>
        </div>
        <div id="second">
          <p onClick={() => router("/multiple")}>CATEGORIES</p>
          <p>LUXE</p>
          <p>BARGAINS</p>
          <p>STYLE HUB</p>
        </div>
        <div id="third">
          <p onMouseOver={dropDown}>MEN</p>
          <p>WOMEN</p>
          <p>BEAUTY</p>
          <p>WATCHES</p>
          <p>KIDS</p>
          <p>HOMESTOP</p>
          <p>GIFTS</p>
          <p>BRANDS</p>
        </div>
      </div>
      {/* // ------------------------------**Login**------------------------------ */}

      <div
        id="login"
        className={`login-form ${isActive ? "active" : ""}`}
        onMouseLeave={closeLoginForm}
      >
        <div>
          <h1>Log in </h1>
          <p>for tailored experience</p>
        </div>
        <div id="forms2">
          <form onSubmit={handleSubmit}>
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
          <p>
            New User? <b onClick={() => router("/register")}> Register </b>
          </p>
        </div>
      </div>

      {/* // ------------------------------**Login**------------------------------ */}

      {/* // ------------------------------**MensDrop**------------------------------ */}
      {display ?
      <div id="mensdrop" onMouseLeave={dropUp}>
      <div>
        <p>
          <b>Clothing</b>
        </p>
        <p>Footwear</p>
        <p>Watches</p>
        <p>Fragrances</p>
        <p>Grooming for men</p>
        <p>Sunglasses and frames</p>
        <p>Accessories</p>
        <p>Jewellery</p>
      </div>
      <div>
        <p>
          <b>All Clothing</b>
        </p>
        <p>
          <b>T-Shirts & Polos</b>
        </p>
        <p>
          <b>Shirts</b>
        </p>
        <p>All Shirts</p>
        <p>Casual</p>
        <p>Formal</p>
        <p>
          <b>Jeans</b>
        </p>
        <p>
          <b>Trousers</b>
        </p>
        <p>All Trousers</p>
        <p>Casual</p>
        <p>Formal</p>
        <p>
          <b>Shorts</b>
        </p>
        <p>
          <b>Sports & Activewear</b>
        </p>
        <p>All Sports & Activewear</p>
        <p>Tshirts</p>
        <p>Joggers & Track Pants</p>
      </div>
      <div>
        <p>
          <b>Suits & Blazers</b>
        </p>
        <p>
          <b>Casual Jackets</b>
        </p>
        <p>
          <b>Ethnicwear</b>
        </p>
        <p>Kurtas</p>
        <p>Kurta Sets</p>
        <p>Nehru Jackets</p>
        <p>
          <b>Winterwear</b>
        </p>
        <p>All Winterwear</p>
        <p>Sweatshirts</p>
        <p>Sweaters</p>
        <p>Jackets</p>
        <p>
          <b>Mask</b>
        </p>
        <p>
          <b>Personal Protection Equipment</b>
        </p>
      </div>
      <div>
        <p>
          <b>Accessories</b>
        </p>
        <p>All Accessories</p>
        <p>Ties Cufflinks & Pocket Squares</p>
        <p>Caps & Hats</p>
        <p>Socks</p>
        <p>Handkerchief</p>
        <p>
          <b>Innerwear & Nightwear</b>
        </p>
        <p>All Innerwear & Nightwear</p>
        <p>Briefs & Trunks</p>
        <p>Boxers</p>
        <p>Vests</p>
        <p>Nightwear & Loungewear</p>
        <p>Thermals</p>
      </div>
    </div> : null}
      {/* // ------------------------------**MensDrop**------------------------------ */}
    </div>
  );
};

export default Navbar;
