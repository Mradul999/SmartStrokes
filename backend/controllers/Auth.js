import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendOTP } from "../utils/sendOTP.js";

import dotenv from "dotenv";
dotenv.config();

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

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
  const { email, otp } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    if (existingUser.otp != otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (existingUser.otpExpiresAt < new Date()) {
      return res
        .status(400)
        .json({
          message:
            "OTP has expired .Please  signup again or request  a new otp",
        });
    }

    existingUser.isVerified = true;
    existingUser.otp = undefined;

    await existingUser.save();
    res.status(200).json({ message: "Email Verified .You can login now" });
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

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error  while login the user", error: error.message });
  }
};
