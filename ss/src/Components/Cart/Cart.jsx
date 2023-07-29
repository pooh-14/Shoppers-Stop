import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";

const Cart = () => {
  const [finalprice, setFinalPrice] = useState(0);
  const [userCart, setUserCart] = useState([]);
  const router = useNavigate();

  // console.log(userCart, "- userCart");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Current-user"));
    if (user?.email) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == user.email &&
          allUsers[i].password == user.password
        ) {
          setUserCart(allUsers[i].cart);
          break;
        }
      }
    } else {
      alert("Please login to watch all cart products.");
      router("/login");
    }
  }, []);

  useEffect(() => {
    if (userCart.length) {
      let totalPrice = 0;
      for (let i = 0; i < userCart.length; i++) {
        totalPrice += userCart[i].price;
      }
      setFinalPrice(totalPrice);
    }
  }, [userCart]);

  function checkout() {
    const user = JSON.parse(localStorage.getItem("Current-user"));
    if (user?.email) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == user.email &&
          allUsers[i].password == user.password
        ) {
          allUsers[i].cart = [];
          break;
        }
      }
      localStorage.setItem("Users", JSON.stringify(allUsers));
    }
    setFinalPrice([]);
    setUserCart([]);
    alert("Your products will be delivered soon. Thankyou for shopping!");
  }

  return (
    <div id="cart">
      <Navbar />
      <p>
        10% Instant Discount on Select HDFC Bank Credit Card on minimum purchase
        of Rs.6000. (Maximum Discount of Rs. 800) TnC Apply
      </p>
      <div id="entire">
        <div id="cartleft">
          <div>
            <span>Delivery options available</span>
            <span>Select your pincode</span>
            <p>Please Select Your Delivery Option</p>
            <div>
              <input type="radio" />
              <p>Standard Delivery</p>
              <input type="radio" />
              <p>Express Delivery</p>
              <input type="radio" />
              <p>Express Store Pickup</p>
            </div>
            <p>Typically delivers between 3-5 days*</p>
          </div>
          <div>
            <img src="https://sslimages.shoppersstop.com/sys-master/root/h06/hee/30234028605470/SAVE23-Coupon-Code-1840x250-Web----new-code--2023-06--22--cart-page.jpg" />
          </div>
         <div>
         {userCart &&
            userCart.map((pro) => (
              <div>
                <div>
                  <div>
                    <img src={pro.image} />
                  </div>
                  <div>
                    <h3>{pro.title}</h3>
                    <p>{pro.description}</p>
                    <h3>{pro.price}</h3>
                    <p> 1 Offer applied for this product</p>
                  </div>
                </div>
                <div>
                  <p>REMOVE</p>
                  <p>MOVE TO WISHLIST</p>
                </div>
              </div>
            ))}
         </div>
        </div>
        <div id="cartright">
          <div>
            <p>Apply Coupon</p>
            <div>
              <input placeholder="Enter promp/coupon code" />
              <p>Apply</p>
            </div>
          </div>
          <div>
            <input type="checkbox" />
            <p>Gift Wrap</p>
          </div>
          <div>
            <p>Order Summary</p>
            <div>
              <p>Sub Total</p>
              <p>{finalprice + finalprice}$</p>
            </div>
            <div>
              <p>Delivery charges*</p>
              <p>0$</p>
            </div>
            <div>
              <p>Coupon discount</p>
              <p>
                <u style={{ backgroundColor: "white" }}>Apply Coupon</u>
              </p>
            </div>
            <div className="margintop">
              <p className="font21" style={{ color: "black" }}>
                Total Price
              </p>
              <p className="font21" style={{ color: "#FF6B35" }}>
                {finalprice}$
              </p>
            </div>
          </div>
          <button onClick={checkout}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
