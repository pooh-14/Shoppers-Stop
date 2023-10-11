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
  const router = useNavigate();           

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
    <div style={{backgroundColor:"#f5f5f5", "height":"560px","width":"100%","border":"1px solid #f5f5f5"}}>
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
                          <h3>{pro.name}</h3>
                          <p>{pro.category}</p>
                          <h3>{pro.price}</h3>
                          <p> 1 Offer applied for this product</p>
                        </div>
                      </div>
                      <div>
                        <p onClick={()=>removecartItem(pro._id)}>REMOVE</p>
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
        <div id="empty">
          <img src="data:image/svg+xml;charset=utf8,%3Csvg width='306' height='230' viewBox='0 0 306 230' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='.04' d='M145.482 224.347c34.531 1.867 70.047 2.234 102.73-7.412 8.948-2.639 17.713-6.075 24.942-11.262 16.905-12.131 23.042-33.898 14.442-51.202-4.602-9.245-12.986-17.506-13.691-27.504-.614-8.714 4.75-16.792 8.634-24.879 10.518-21.878 9.903-48.736-7.115-67.415-18.207-20.025-50.157-26.636-79.82-28.84a494.448 494.448 0 0 0-67.59-.15c-8.788.555-17.735 1.346-25.784 4.386-12.218 4.618-21.085 13.95-27.751 23.784-6.095 8.991-10.738 18.636-13.805 28.677-2.344 7.667-3.783 15.59-7.434 22.882-5.87 11.75-16.996 20.917-24.908 31.769-15.705 21.507-20.323 61.528 3.84 80.545 27.848 21.916 77.646 24.686 113.31 26.621z' fill='%23FF6B35'/%3E%3Cpath opacity='.45' d='M151.677 190.662c71.233 0 128.978-3.085 128.978-6.892 0-3.807-57.745-6.892-128.978-6.892-71.234 0-128.98 3.085-128.98 6.892 0 3.807 57.746 6.892 128.98 6.892z' fill='%23E6E6E6'/%3E%3Cpath d='M150.789 107.134s4.376-3.833 6.579-.767c2.203 3.067-.711 5.076-4.536 5.283-3.825.207-2.043-4.516-2.043-4.516z' fill='%23F4A28C'/%3E%3Cpath opacity='.08' d='M150.789 107.134s4.376-3.833 6.579-.767c2.203 3.067-.711 5.076-4.536 5.283-3.825.207-2.043-4.516-2.043-4.516z' fill='%23000'/%3E%3Cpath d='M109.663 90.467s4.238 17.986 15.912 18.53c11.674.544 24.74-5.313 24.74-5.313l2.295 7.207-31.985 8.709s-20.311-10.473-20.571-11.699c-.26-1.227 9.609-17.434 9.609-17.434z' fill='%23777'/%3E%3Cpath opacity='.08' d='M109.663 90.467s4.238 17.986 15.912 18.53c11.674.544 24.74-5.313 24.74-5.313l2.295 7.207-31.985 8.709s-20.311-10.473-20.571-11.699c-.26-1.227 9.609-17.434 9.609-17.434z' fill='%23000'/%3E%3Cpath d='M157.368 110.875h8.079a5.125 5.125 0 0 1 5.064 4.363l5.684 37.336h59.081c1.446 0 2.85-.488 3.987-1.385a6.469 6.469 0 0 0 2.278-3.56l8.828-36.462' stroke='%2324285B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M107.689 176.801s2.387 1.917 4.72.767c2.333-1.15 4.246.644 2.593 2.438-1.652 1.794-8.369 2.376-8.369 2.376l-2.593-4.063 3.649-1.518zM46.32 163.338s-3.06.391-3.824 2.891c-.765 2.499-3.412 2.614-3.55.184-.137-2.431 4.093-7.667 4.093-7.667l4.728.943-1.446 3.649z' fill='%23777'/%3E%3Cpath d='m95.663 49.327-5.217 12.451 7.26 4.086 1.079-11.17-3.122-5.367z' fill='%23F4A28C'/%3E%3Cpath opacity='.31' d='M98.685 57.155a5.429 5.429 0 0 1-2.219-2.2s-.543 2.706 1.745 6.064l.474-3.864z' fill='%23CE8172'/%3E%3Cpath d='M102.227 48.73s.765 4.523.26 7.62a2.29 2.29 0 0 1-.929 1.519 2.294 2.294 0 0 1-1.733.398 5.083 5.083 0 0 1-4.276-3.489l-1.699-3.887a4.126 4.126 0 0 1 1.439-4.538c2.425-2.093 6.601-.407 6.938 2.376z' fill='%23F4A28C'/%3E%3Cpath d='M101.11 49.013c-1.408.16-2.83.16-4.238 0a3.838 3.838 0 0 1 .352 4.186 3.116 3.116 0 0 1-3.642 1.533l-.413-5.88a4.677 4.677 0 0 1 2.012-4.355 15.14 15.14 0 0 1 1.874-1.119c1.638-.82 4.2.1 5.623-1.165a1.102 1.102 0 0 1 1.806.575c.413 1.763.321 4.6-2.005 5.78-.426.229-.89.38-1.369.445z' fill='%2324285B'/%3E%3Cpath d='M97.698 53.053s-.176-1.763-1.491-1.533c-1.316.23-1.064 2.79.765 2.883l.726-1.35zM102.564 51.604l1.423 1.656a.768.768 0 0 1-.368 1.189l-1.713.475.658-3.32z' fill='%23F4A28C'/%3E%3Cpath d='M102.219 67.551c-.436-.33-.856-.675-1.27-1.035-2.486-2.177-11.475-9.154-20.609-5.367-10.77 4.508-5.92 10.42 3.343 11.186 26.332 2.216 20.663-3.212 18.536-4.784z' fill='%23777'/%3E%3Cpath opacity='.44' d='M102.219 67.551c-.436-.33-.856-.675-1.27-1.035-2.486-2.177-11.475-9.154-20.609-5.367-10.77 4.508-5.92 10.42 3.343 11.186 26.332 2.216 20.663-3.212 18.536-4.784z' fill='%23fff'/%3E%3Cpath d='M97.767 66.96c-9.945-3.756-21.175.23-27.112 9.086-2.838 4.232-5.355 9.453-5.951 15.164-1.484 14.444-3.504 27.171-3.504 27.171l28.037 12.267s23.294-16.323 22.308-35.689c-.727-13.692-3.167-24.004-13.778-27.998z' fill='%23777'/%3E%3Cpath opacity='.08' d='M85.764 74.88s-10.656 11.914-5.952 33.013c4.705 21.099-7.588 15.333-7.588 15.333l16.99 7.452s8.469-6.846 10.588-9.537l2.119-2.691-16.157-43.57z' fill='%23000'/%3E%3Cpath d='M96.222 70.35s9.18 2.23 10.281 13.8c1.102 11.568 5.952 30.321 19.722 27.53a737.088 737.088 0 0 1 25.245-4.653l2.226 7.444s-38.587 22.525-57.467 3.726c-18.88-18.799-16.424-51.574-.007-47.848z' fill='%23777'/%3E%3Cpath opacity='.44' d='M96.222 70.35s9.18 2.23 10.281 13.8c1.102 11.568 5.952 30.321 19.722 27.53a737.088 737.088 0 0 1 25.245-4.653l2.226 7.444s-38.587 22.525-57.467 3.726c-18.88-18.799-16.424-51.574-.007-47.848z' fill='%23fff'/%3E%3Cpath opacity='.1' d='M29.07 135.783c-3.605 3.599-3.825 9.117-3.825 9.117s5.585-.313 9.176-3.916c3.591-3.603 3.83-9.117 3.83-9.117s-5.59.324-9.18 3.916zM43.946 47.3c1.22 4.87 5.695 7.9 5.695 7.9s2.498-4.864 1.278-9.736c-1.22-4.872-5.695-7.897-5.695-7.897s-2.512 4.864-1.278 9.732zM250.924 60.652c-3.605 3.598-3.829 9.115-3.829 9.115s5.589-.314 9.18-3.915c3.591-3.602 3.825-9.119 3.825-9.119s-5.585.338-9.176 3.919zM181.337 110.858c-.381 5.081 2.717 9.509 2.717 9.509s3.722-3.813 4.103-8.898c.382-5.086-2.716-9.502-2.716-9.502s-3.723 3.805-4.104 8.891zM259.367 166.059c-.381 5.081 2.717 9.508 2.717 9.508s3.722-3.813 4.103-8.893c.382-5.081-2.716-9.507-2.716-9.507s-3.722 3.812-4.104 8.892z' fill='%23FF6363'/%3E%3Cpath d='M61.2 118.381s-4.644 8.748 0 12.267 36.062 30.16 42.075 48.031l6.395-2.606s-5.408-25.507-20.448-45.425L61.2 118.381z' fill='%2324285B'/%3E%3Cpath d='M61.2 130.671s23.96 33.319-15.048 26.434v6.9s39.36 10.619 38.25-13.8C83.293 125.787 61.2 130.671 61.2 130.671z' fill='%2324285B'/%3E%3Cpath d='M76.5 179.4c2.535 0 4.59-.343 4.59-.767 0-.423-2.055-.766-4.59-.766-2.535 0-4.59.343-4.59.766 0 .424 2.055.767 4.59.767z' fill='%23BABABA'/%3E%3Cpath d='M78.972 176.9c.272-.232.471-.544.57-.896.072-.356-.072-.773-.4-.911-.365-.145-.756.118-1.052.385-.296.268-.637.569-1.025.514.2-.188.35-.427.434-.693.084-.266.1-.55.048-.825a.63.63 0 0 0-.134-.309c-.202-.226-.571-.129-.813.049-.774.567-.99 1.659-.994 2.643-.079-.355-.013-.724-.015-1.083-.001-.359-.098-.774-.392-.964a1.15 1.15 0 0 0-.595-.147c-.348-.012-.735.023-.973.288-.297.329-.219.88.039 1.237.257.358.647.588 1.007.839.287.178.533.422.718.713.021.04.04.083.053.127h2.18c.487-.258.94-.584 1.344-.967z' fill='%23BABABA'/%3E%3Cpath d='M172.263 193.2c2.595 0 4.699-.356 4.699-.796 0-.439-2.104-.795-4.699-.795-2.595 0-4.699.356-4.699.795 0 .44 2.104.796 4.699.796z' fill='%23F4EDEB'/%3E%3Cpath d='M173.225 180.933s.959 1.258-.442 3.148c-1.401 1.89-2.556 3.497-2.094 4.681 0 0 2.115-3.523 3.839-3.572 1.724-.049.586-2.143-1.303-4.257z' fill='%23E8CFCB'/%3E%3Cpath opacity='.1' d='M173.225 180.933c.084.122.15.255.197.396 1.678 1.976 2.572 3.82.958 3.866-1.503.044-3.305 2.737-3.738 3.417.015.052.031.104.051.155 0 0 2.115-3.523 3.839-3.572 1.724-.049.582-2.148-1.307-4.262z' fill='%23000'/%3E%3Cpath d='M168.163 180.933s-.96 1.258.442 3.148c1.401 1.89 2.556 3.497 2.093 4.681 0 0-2.113-3.523-3.838-3.572-1.726-.049-.59-2.143 1.303-4.257z' fill='%23E8CFCB'/%3E%3Cpath opacity='.1' d='M168.163 180.933c-.084.122-.15.255-.197.396-1.679 1.976-2.572 3.82-.958 3.866 1.502.044 3.305 2.737 3.737 3.417a1.175 1.175 0 0 1-.052.155s-2.113-3.523-3.839-3.572c-1.725-.049-.584-2.148 1.309-4.262z' fill='%23000'/%3E%3Cpath d='M166.685 188.603s2.68-.084 3.49-.659c.809-.576 4.123-1.265 4.324-.35.2.914 4.027 4.597 1.001 4.622-3.025.024-7.03-.473-7.836-.964s-.979-2.649-.979-2.649z' fill='%23A8A8A8'/%3E%3Cpath opacity='.2' d='M175.552 191.903c-3.025.024-7.03-.472-7.836-.964-.614-.374-.86-1.719-.94-2.34h-.091s.175 2.167.977 2.658c.803.492 4.811.988 7.836.964.873 0 1.175-.318 1.159-.778-.122.281-.455.454-1.105.46z' fill='%23000'/%3E%3Cpath d='M152.166 109.396s5.921-3.458 7.405 0c1.484 3.457-5.883 5.075-5.883 5.075l-1.522-5.075z' fill='%23F4A28C'/%3E%3Cpath d='m175.124 145.567 3.06 19.013a8.158 8.158 0 0 0 2.756 4.903 8.125 8.125 0 0 0 5.269 1.944h52.525' stroke='%2324285B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M188.909 182.635a4.366 4.366 0 0 0 4.361-4.37 4.366 4.366 0 0 0-4.361-4.37 4.365 4.365 0 0 0-4.36 4.37 4.365 4.365 0 0 0 4.36 4.37zM231.619 182.635a4.365 4.365 0 0 0 4.36-4.37 4.365 4.365 0 0 0-4.36-4.37 4.365 4.365 0 0 0-4.36 4.37 4.365 4.365 0 0 0 4.36 4.37z' fill='%23FF6B35'/%3E%3C/svg%3E"/>
          <p>Your cart needs some love</p>
          <p>Fill your cart with the best of Shoppers Stop</p>
          <p onClick={()=>router('/')}><u>Start Shopping</u></p>
        </div>
      )}
    </div>
  );
};

export default Cart;
