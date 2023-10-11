import UserModal from "../Modals/User.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendTwilioMessage } from "../Helper/Sms.js";
import { customAlphabet } from "nanoid";

export const Register = async (req, res) => {
  try {
    const { userData } = req.body;
    const { name, email, password, role } =userData;
    if (!name || !email || !password || !role)
      return res.json({
        success: false,
        message: "All Feilds are Mandatory!",
      });

    const isEmailExist = await UserModal.find({ email: email });
    if (isEmailExist.length) {
      return res.json({
        success: false,
        message: "Email already exists! Try a new one.",
      });
    }

    const hashPassW = await bcrypt.hash(password, 10);

    const user = new UserModal({
      name:name,
      email:email,
      password: hashPassW,
      role:role,
    });

    await user.save();

    return res.json({
      success: true,
      message: "User Registered Successfully!",
      user:user
    });
  } catch (error) {
    return res.json({ success: false, message: error.message});
  }
};
       
export const Login = async (req, res) => {
  try {
    // const { userData } = req.body;
    const { email, password } = req.body.userData;
    console.log(email, password);
    if (!email || !password)
      return res.json({
        success: false,
        message: "All feilds are mandatory!",
      });

    const user = await UserModal.findOne({ email:email });
    if (!user) return res.json({ success: false, message: "User not found!" });

    if (user.isBlocked) {
      return res.json({
        success: false,
        message: "You are Blocked!Contact us.",
      });
    }

    const isPasswordRight = await bcrypt.compare(password, user.password);
    // console.log(isPasswordRight, "isPasswordRight");
    if (isPasswordRight) {
      const userObj = {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      };

      // console.log(token, "token here");
      // const expiryTime = user?.role == "Seller" ? "4h" : "1h";
      // console.log(expiryTime, "expiryTime")
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return res.json({
        success: true,
        message: "Login Successfull",
        user: userObj,
        token: token,
      });
    }
    return res.json({ success: false, message: "Password is Wrong!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decoededData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoededData, "decoededData")
    if (!decoededData) {
      return res
        .status(404)
        .json({ success: false, message: "Not valid json token.." });
    }
    // return res.send(decoededData)

    const userId = decoededData?.userId;

    const user = await UserModal.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found.." });
    }

    const userObeject = {
      name: user?.name,
      email: user?.email,
      _id: user?._id,
      role: user?.role,
    };

    return res.status(200).json({ success: true, user: userObeject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getNumber = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.json({ success: false, message: "User Id is mandtory.." });

    const userNumber = await UserModal.findById(userId).select(
      "number isNumberVerified"
    );
    if (userNumber) {
      return res.json({
        success: true,
        number: userNumber.number,
        isNumberVerified: userNumber.isNumberVerified,
      });
    }
    return res.json({ success: false, message: "Internal error try again.." });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.json({ success: false, message: "User Id is mandtory.." });

    const userNumber = await UserModal.findById(userId);

    const nanoid = customAlphabet("1234567890", 6);
    const otp = nanoid();
    // const otp = "999222";

    const message = `Hi! Your mobile verification otp is - ${otp}`;
    if (userNumber) {
      const responseFromTwilio = sendTwilioMessage(userNumber.number, message);
      console.log(responseFromTwilio, "responseFromTwilio");
      if (responseFromTwilio) {
        userNumber.otpForNumberVerification = otp;
        await userNumber.save();
        return res.json({ success: true, message: "Otp sent to your number." });
      }
    }
    return res.json({ success: false, message: "User not found!" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, userId } = req.body;

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User Id is required!" });
    }

    if (!otp) {
      return res
        .status(404)
        .json({ success: false, message: "OTP is required!" });
    }

    const user = await UserModal.findById(userId);

    if (user) {
      if (user.otpForNumberVerification == otp) {
        user.isNumberVerified = true;

        await user.save();

        return res.status(200).json({
          success: true,
          isNumberVerified: user.isNumberVerified,
          message: "OTP verified successfully!",
        });
      }
      return res
        .status(404)
        .json({ success: false, message: "Not a valid OTP number!" });
    }
    return res
      .status(404)
      .json({ success: false, message: "Not a valid user!" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const checkOut = async (req, res) => {
  try {
    
    const { token } = req.body;
  
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });
  
        const decoededData = jwt.verify(token, process.env.JWT_SECRET);
        // return res.send(decoededData)
        // console.log(decoededData, "decoededData")
  
        if (!decoededData) {
          return res
            .status(404)
            .json({ success: false, message: "Not valid json token.." });
        }
        // return res.send(decoededData)
    
        const newuserid = decoededData?.userId;
  
    const user = await UserModal.findByIdAndUpdate(newuserid,{cart:[]});
    
      return res.status(200).json({
        success: true,
        message: "Thank you for shopping! Your products will be delivered soon!", user
      })
    
  } catch (error) {
    
    return res.status(500).json({ success: false, message: error.message });
  }
  };
