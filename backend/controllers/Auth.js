import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendOTP } from "../utils/sendOTP.js";

import dotenv from "dotenv";
dotenv.config();

export const SignUp = async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); //6digit otp
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); //5min expiry

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      otp,
      isVerified: false,
      otpExpiresAt: otpExpiry,
      profileImage: profilePic || "https://thumbs.dreamstime.com/b/modern-random-cartoon-sticker-detailed-illustrated-isolated-white-background-modern-random-cartoon-sticker-detailed-illustrated-353166857.jpg",
    });
    await newUser.save();
    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP  sent to mail .Please verify" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in registering user", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp, profileImage } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    if (existingUser.otp != otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (existingUser.otpExpiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP has expired .Please  signup again or request  a new otp",
      });
    }

    existingUser.isVerified = true;
    existingUser.otp = undefined;
    
    // Update profile image if provided during verification
    if (profileImage) {
      existingUser.profileImage = profileImage;
    }

    await existingUser.save();
    
    // Return the user data for auto-login
    const token = jwt.sign({ id: existingUser._id }, process.env.secret, {
      expiresIn: "1d",
    });

    res
      .cookie("access-token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ 
        message: "Email Verified. You are now logged in.", 
        user: {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          profileImage: existingUser.profileImage,
          isVerified: existingUser.isVerified
        }
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error verifying otp", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User not registered yet" });

    if (!existingUser.isVerified)
      return res.status(401).json({
        message:
          "Email not verified.Please verify the email first before login ",
      });

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.secret, {
      expiresIn: "1d",
    });

    res
      .cookie("access-token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "User logged in successfully", existingUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error  while login the user", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access-token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};
