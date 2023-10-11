import React, { useContext, useEffect, useState } from "react";
import "./Single.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import api from "../ApiConfig";
import toast from "react-hot-toast";

const Single = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [singleProductData, setSingleProductData] = useState({});
  const router = useNavigate();

  useEffect(() => {
    async function getSingleProductData() {
      if (id) {
        try {
          const response = await api.post("/get-single-product-data", {
            productId: id,
          });
          if (response.data.success) {
            setSingleProductData(response.data.product);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    getSingleProductData();
  }, [id]);

  console.log(singleProductData, "singleProductData");

  async function addToCart(productId) {
    try {
      console.log("Adding product to cart:", productId);
      const response = await api.post("/add-to-cart", {
        productId,
        userId: state?.user?._id,
      });

      if (response.data.success) {
        toast.success("Product added successfully to cart!!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  }

  return (
    <div>
      {/* <Navbar/> */}
      <div id="bodi">
        <div>
          {/* <p> Home / Clothing / Women Clothing / Dresses / <b>Berrylush Dresses - More By Berrylush</b></p> */}
        </div>
        <div id="proinfo">
          <div>
            <div>
              <img src={singleProductData.image} />
            </div>
            <div>
              <img src={singleProductData.image} />
            </div>
            <div>
              <img src={singleProductData.image} />
            </div>
            <div>
              <img src={singleProductData.image} />
            </div>
            <div>
              <img src={singleProductData.image} />
            </div>
            <div>
              <img src={singleProductData.image} />
            </div>
          </div>

          <div id="toright">
            <div>
              <h2>{singleProductData.name}</h2>
              {/* <p>{singleProductData.description}</p> */}
            </div>
            <div>
              <h2>{singleProductData.price}$</h2>
              <p>inclusive of all taxes</p>
              <h4> SELECT SIZE </h4>
              <div>
                <div>
                  <p>XS</p>
                </div>
                <div>
                  <p>S</p>
                </div>
                <div>
                  <p>M</p>
                </div>
                <div>
                  <p>L</p>
                </div>
                <div>
                  <p>XL</p>
                </div>
              </div>
              <div id="flex">
                <div>
                  <i class="fa-solid fa-share-nodes fa-xl"></i>
                  <i class="fa-regular fa-heart fa-xl"></i>
                </div>
                <div>
                  <input onClick={() => addToCart(singleProductData._id)} type="submit" value="ADD TO BAG" />
                </div>
              </div>
            </div>
            <div id="delivery">
              <div>
                <h4>
                  <b>DELIVERY OPTIONS</b>
                </h4>
              </div>
              <div>
                <input placeholder="Enter pincode" />
              </div>
              <div>
                <p style={{ fontSize: "smaller", marginBottom: "20px" }}>
                  Please enter PIN code to check delivery time & Pay on Delivery
                  Availability
                </p>
                <p>100% Original Products</p>
                <p> Pay on delivery might be available</p>
                <p>Easy 14 days returns and exchanges</p>
                <p> Try & Buy might be available</p>
              </div>
              <div style={{ marginTop: "20px" }}>
                <h4>
                  <b>BEST OFFERS</b>
                </h4>
                <p>
                  <b>Best Price:Rs. 1374</b>
                </p>
                <ul>
                  <li>Applicable on: Purchase of 2 or more items</li>
                  <li>Coupon code: FWD15</li>
                  <li>Coupon Discount: 15% off (Your total saving: Rs. 528)</li>
                </ul>
                <p style={{ color: "rgb(243, 4, 167)" }}>
                  <b>View Eligible Products</b>
                </p>
                <p>
                  <b>Up To Rs 500 Cashback on CRED pay transactions</b>
                </p>
                <ul>
                  <li>
                    Min Spend Rs 1,000. Available only on Android Devices.
                  </li>
                </ul>
                <p style={{ color: "rgb(243, 4, 167)" }}>
                  <b>Terms and Conditions</b>
                </p>
                <p>
                  <b>EMI option available</b>
                </p>
                <ul>
                  <li>EMI starting from Rs.76/month</li>
                </ul>
                <p style={{ color: "rgb(243, 4, 167)" }}>
                  <b>View Plan</b>
                </p>
              </div>
            </div>
            <div>
              <div id="details">
                <h4>
                  <b>PRODUCT DETAILS</b>
                </h4>
                <p>
                  Dress up or down with this chic dress. Tailored with an
                  alluring self-design print and sweetheart neck, this dress
                  beautifully stands apart.
                </p>
                <p>Classic white shade</p>
                <p>Chic self-design print</p>
                <p> Sweetheart neck</p>
                <p> Short puff sleeves</p>
                <p> Viscose rayon, machine wash</p>
                <p style={{ marginTop: "15px" }}>
                  <b>Trend Alert</b>
                </p>
                <p>
                  A corset is a tight"-fitting piece of undergarment or clothing
                  that provides compression around your midsection. It offers
                  support as well as a flattering silhouette.
                </p>
                <p style={{ marginTop: "15px" }}>
                  <b>Size & Fit</b>
                </p>
                <p>The model (height 5'8) is wearing a size S</p>
                <p style={{ marginTop: "15px" }}>
                  <b>Material & Care</b>
                </p>
                <p>Visose Rayon</p>
                <p>Machine Wash</p>
                <p>
                  <b>Specifications</b>
                </p>
                <div id="speci">
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>Shape</p>
                    <p>Bodycon</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>Neck</p>
                    <p>Sweetheart Neck</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>Length</p>
                    <p>Mini</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>
                      Print or Pattern
                    </p>
                    <p>Self Design</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>
                      Sleeve Length
                    </p>
                    <p>Short Sleeves</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>
                      Sleeve Styling
                    </p>
                    <p>Puff Sleeves</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>Ocassion</p>
                    <p>Casual</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: "grey" }}>
                      Knit or Woven
                    </p>
                    <p>Woven</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
