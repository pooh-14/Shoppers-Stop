import React from 'react'
import './Cart.css'

const Cart = () => {
  return (
    <div id='cart'>
        <p>10% Instant Discount on Select HDFC Bank Credit Card on minimum purchase of Rs.6000. (Maximum Discount of Rs. 800) TnC Apply</p>
        <div id='entire'>
        <div id='cartleft'>
            <div>
                <span>Delivery options available</span>
                <span>Select your pincode</span>
                <p>Please Select Your Delivery Option</p>
                <div>
                    <input type='radio'/><p>Standard Delivery</p>
                    <input type='radio'/><p>Express Delivery</p>
                    <input type='radio'/><p>Express Store Pickup</p>
                </div>
                <p>Typically delivers between 3-5 days*</p>
            </div>
            <div>
                <img src='https://sslimages.shoppersstop.com/sys-master/root/h06/hee/30234028605470/SAVE23-Coupon-Code-1840x250-Web----new-code--2023-06--22--cart-page.jpg'/>
            </div>
            <div>
                <div>
                <div>
                    <img src='https://sslimages.shoppersstop.com/sys-master/images/he9/h6d/28124577693726/A22507DR3021_BLACK.jpg_230Wx334H'/>
                </div>
                <div>
                    <p>name</p>
                    <p>description</p>
                    <p>price</p>
                    <p> 1 Offer applied for this product</p>
                </div>
                </div>
                <div>
                    <p>REMOVE</p>
                    <p>MOVE TO WISHLIST</p>
                </div>
            </div>
        </div>
        <div id='cartright'>
            <div>
                <p>Apply Coupon</p>
                <div>
                    <input placeholder='Enter promp/coupon code'/>
                    <p>Apply</p>
                </div>
            </div>
            <div>
                <input type='checkbox'/>
                <p>Gift Wrap</p>
            </div>
            <div>
                <div>
                    <p>Shop for Rs600.30 more to avail free shipping </p>
                    <p>For more details read our Shipping Policy</p>
                </div>
                
                <div>
                <p>Order Summary</p>  
                <div>
                    <p>Sub Total</p>
                    <p>$</p>
                </div>
                <div>
                    <p>Delivery charges*</p>
                    <p>30$</p>
                </div>
                <div>
                    <p>Coupon discount</p>
                    <p>Apply Coupon</p>
                </div>
                <div>
                    <p>Total Price</p>
                    <p>$</p>
                </div>
                </div>
            </div>
            <button>CHECKOUT</button>
        </div>
        </div>
        
    </div>
  )
}

export default Cart