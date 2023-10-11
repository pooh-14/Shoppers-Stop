import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  Login,
  Register,
  checkOut,
  getCurrentUser,
  getNumber,
  sendOtp,
  verifyOtp,
} from "./Controllers/User.controller.js";
import {
  addComments,
  addProduct,
  addRating,
  addToCart,
  allCartProducts,
  allProduct,
  deleteYourProduct,
  getSingleProductData,
  getYourProducts,
  updateYourProduct,
} from "./Controllers/Product.controller.js";
import { addCart, getCartProducts, removeCartItem } from "./Controllers/Buyers.controller.js";
import {
  blockProduct,
  blockUser,
  getAllBuyers,
  getAllProducts,
  getAllSellers,
  getBlockedProducts,
  getUnVerifiedProducts,
  getVerifiedProducts,
  unBlockProduct,
  unBlockUser,
  verifyProduct,
} from "./Controllers/Admin.controller.js";
import {
  checkSeller,
  isAdmin,
  isValidUser,
} from "./Middlewares/All.Middleware.js";
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("Working!");
});

app.post("/register", Register);

app.post("/login", Login);

app.post("/get-current-user", getCurrentUser);

app.post("/add-product", checkSeller, addProduct);

app.get("/all-products", allProduct);

app.post("/get-number", getNumber)

app.post("/send-otp", sendOtp)

app.post("/verify-otp", verifyOtp)








app.post("/get-your-products", checkSeller, getYourProducts);

app.post("/update-your-product", checkSeller, updateYourProduct);

app.post("/add-cart", addCart);



app.post("/get-single-product-data", getSingleProductData);

app.post("/add-to-cart", addToCart);

app.post("/remove-cart-items", removeCartItem);

app.post("/all-cart-products", allCartProducts);

app.get("/get-cart-products", getCartProducts);

app.post("/checkout", checkOut);

app.post("/delete-your-product",checkSeller, deleteYourProduct);

app.patch("/block-user", isAdmin, blockUser);

app.patch("/un-block-user", isAdmin, unBlockUser);

app.patch("/block-product", isAdmin, blockProduct);

app.patch("/un-block-product", isAdmin, unBlockProduct);

app.patch("/verify-product", isAdmin, verifyProduct);

app.patch("/add-rating", isValidUser, addRating);

app.get("/get-all-buyers", isAdmin, getAllBuyers); // UserModel.find({role : "Buyer"}) - assignemnt
app.get("/get-all-sellers", isAdmin, getAllSellers); // UserModel.find({role : "Seller"}) - assignemnt
app.get("/get-all-products", isAdmin, getAllProducts); // ProductModel.find({}) - assignemnt

app.patch("/get-verify-product", isAdmin, getVerifiedProducts); //- assignemnt
app.patch("/get-un-verify-product", isAdmin, getUnVerifiedProducts); //- assignemnt
app.patch("/get-blocked-product", isAdmin, getBlockedProducts); //- assignemnt

app.patch("/add-comments", isValidUser, addComments); //- assignemnt - {userId comment}

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB!");
});

app.listen(8000, () => {
  console.log("Server running on port 8000!");
});
