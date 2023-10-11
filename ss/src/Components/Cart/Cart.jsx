import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import api from "../ApiConfig";
import { AuthContext } from "../../Context/AuthContext";

const Cart = () => {
  const [finalprice, setFinalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const { state } = useContext(AuthContext);

  console.log(state, "state here");

  useEffect(() => {
    async function getCartProduct() {
      try {
        const response = await api.post("/all-cart-products", {
          userId: state?.user?._id,
        });
        if (response.data.success) {
          setCartProducts(response.data.cartProducts);
        }
      } catch (error) {
        console.log(error, "error in cart");
      }
    }
    if (state?.user?._id) {
      getCartProduct();
    }
  }, [state, cartProducts]);

  console.log(cartProducts, "cartProducts here");

  const checkOut = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token, "token here");
    if (token) {
      console.log(token, "token here");
      try {
        const response = await api.post("/checkOut", { token });
        // console.log(response.data.success,"response here");
        if (response.data.success) {
          toast.success(response.data.message);
          setCartProducts([]);
          setFinalPrice([]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  // }

  useEffect(() => {
    if (cartProducts.length) {
      var totalprice = 0;
      for (var i = 0; i < cartProducts.length; i++) {
        totalprice += cartProducts[i].price;
      }
      setFinalPrice(totalprice);
    }
  }, [cartProducts]);

  const removecartItem = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      // console.log(token, "token here");
      const response = await api.post("remove-cart-items", {
        productId,
        token,
      });
      console.log(response, "data here");
      if (response.data.success) {
        toast.success("item removed succesfully");
        setCartProducts(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {cartProducts.length ? (
        <div id="cart">
          {/* <Navbar /> */}
          <p>
            10% Instant Discount on Select HDFC Bank Credit Card on minimum
            purchase of Rs.6000. (Maximum Discount of Rs. 800) TnC Apply
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
                {cartProducts &&
                  cartProducts.map((pro) => (
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
              <button onClick={checkOut}>CHECKOUT</button>
            </div>
          </div>
        </div>
      ) : (
        <p>no products!</p>
      )}
    </div>
  );
};

export default Cart;
