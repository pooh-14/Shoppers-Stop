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

  // ------------------------------**infoDrop**------------------------------

  const [profile, setProfile] = useState(false);

  const popDown = () => {
    setProfile(true);
  };

  const popUp = () => {
    setProfile(false);
  };

  // ------------------------------**infoDrop**------------------------------

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
              {!state?.user?.name ? (
                <i
                  onClick={openLoginForm}
                  class="fa-regular fa-circle-user fa-lg"
                ></i>
              ) : (
                <div onMouseOver={popDown}>
                  <p>{state?.user?.name}</p>
                </div>
              )}
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
      {display ? (
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
        </div>
      ) : null}
      {/* // ------------------------------**MensDrop**------------------------------ */}

      {/* ------------------------------**infoDrop**------------------------------ */}
      {profile ? (
        <div id="infodrop" onMouseLeave={popUp}>
          <div>
            <img src="data:image/svg+xml;charset=utf8,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.3344 3.41323C11.5361 3.29453 11.7659 3.23193 12 3.23193C12.2341 3.23193 12.4639 3.29453 12.6656 3.41323C12.8673 3.53193 13.0337 3.70242 13.1473 3.90703L15.9085 8.87712C15.9312 8.91807 15.9685 8.94903 16.0129 8.96388C16.0574 8.97874 16.1057 8.97643 16.1485 8.9574L20.8908 6.84975C21.1141 6.75049 21.3607 6.71555 21.6028 6.74889C21.8449 6.78222 22.0729 6.88249 22.2611 7.0384C22.4494 7.19432 22.5903 7.39969 22.6681 7.63138C22.7459 7.86306 22.7574 8.11187 22.7014 8.34977L20.3116 18.5057C20.2706 18.678 20.1953 18.8403 20.09 18.9827C19.9847 19.1252 19.8517 19.2449 19.699 19.3346C19.5463 19.4243 19.377 19.4823 19.2014 19.5049C19.0263 19.5275 18.8485 19.5145 18.6785 19.4668C14.3061 18.2607 9.68874 18.2612 5.3166 19.4682C5.14669 19.5158 4.96891 19.5288 4.79388 19.5062C4.61814 19.4836 4.4488 19.4257 4.29603 19.3359C4.14327 19.2461 4.01025 19.1263 3.90498 18.9838C3.79971 18.8412 3.72437 18.6789 3.68348 18.5065L3.6832 18.5053L1.29771 8.34891C1.24184 8.11104 1.25348 7.86228 1.33133 7.63067C1.40917 7.39904 1.55013 7.19376 1.73833 7.03791C1.92653 6.88206 2.1545 6.78185 2.39657 6.74855C2.63864 6.71525 2.8852 6.75019 3.1085 6.84943L7.85145 8.9574C7.89425 8.97643 7.94263 8.97874 7.98706 8.96388C8.03149 8.94902 8.06875 8.91807 8.0915 8.87712L10.8527 3.90703C10.9663 3.70242 11.1327 3.53193 11.3344 3.41323ZM12 4.35693C11.9666 4.35693 11.9337 4.36588 11.9049 4.38283C11.8761 4.39979 11.8523 4.42415 11.8361 4.45338L9.07493 9.42347C8.91567 9.71013 8.65487 9.92679 8.34387 10.0308C8.03288 10.1348 7.69421 10.1186 7.39454 9.98544L2.65159 7.87746C2.61969 7.86329 2.58447 7.8583 2.54989 7.86305C2.51531 7.86781 2.48274 7.88213 2.45585 7.90439C2.42897 7.92666 2.40883 7.95598 2.39771 7.98907C2.38659 8.02216 2.38493 8.05769 2.39291 8.09168L4.77812 18.2469C4.77815 18.247 4.77808 18.2467 4.77812 18.2469C4.78401 18.2715 4.7949 18.2951 4.80993 18.3154C4.82505 18.3359 4.84416 18.3531 4.8661 18.366C4.88804 18.3789 4.91236 18.3872 4.93761 18.3905C4.96285 18.3937 4.98849 18.3918 5.01298 18.3849L5.01611 18.384C9.58491 17.1226 14.4101 17.1221 18.9791 18.3827L18.9822 18.3836C19.0067 18.3905 19.0324 18.3924 19.0576 18.3891C19.0828 18.3859 19.1071 18.3776 19.1291 18.3647C19.151 18.3518 19.1701 18.3346 19.1852 18.3141C19.2003 18.2937 19.2111 18.2705 19.217 18.2458C19.217 18.2457 19.217 18.2459 19.217 18.2458L21.6063 8.09207C21.6143 8.05809 21.6127 8.02255 21.6016 7.98945C21.5905 7.95635 21.5703 7.92701 21.5434 7.90474C21.5166 7.88246 21.484 7.86814 21.4494 7.86338C21.4148 7.85861 21.3796 7.8636 21.3477 7.87778L16.6054 9.98544C16.3058 10.1186 15.9671 10.1348 15.6561 10.0308C15.3451 9.92679 15.0843 9.71013 14.9251 9.42347L12.1639 4.45338C12.1477 4.42415 12.1239 4.39979 12.0951 4.38283C12.0663 4.36588 12.0334 4.35693 12 4.35693Z' fill='black'/%3E%3C/svg%3E" />
            <p>My Profile</p>
          </div>
          <div>
            <i class="fa-solid fa-box fa-lg"></i>
            <p>Orders</p>
          </div>
          <div>
            <i class="fa-regular fa-user fa-lg"></i>
            <p>My Account</p>
          </div>
          <div>
            <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
            <p onClick={() => dispatch({ type: "LOGOUT" })}>Logout</p>
          </div>
        </div>
      ) : null}
      {/* ------------------------------**infoDrop**------------------------------ */}
    </div>
  );
};

export default Navbar;
