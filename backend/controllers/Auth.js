import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendOTP } from "../utils/sendOTP.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";
import transporter from "../utils/nodemailertransporter.js";

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
      profileImage:
        profilePic ||
        "https://thumbs.dreamstime.com/b/modern-random-cartoon-sticker-detailed-illustrated-isolated-white-background-modern-random-cartoon-sticker-detailed-illustrated-353166857.jpg",
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
          isVerified: existingUser.isVerified,
        },
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
        secure: process.env.NODE_ENV === "production", // true in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // important for cross-origin requests
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        path: "/", // make cookie available for all paths
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.secret, {
      expiresIn: "15m",
    });

    // Create reset password link
    // console.log("frontendurl =>", process.env.FRONTEND_URL);
    const resetLink = `https://smart-strokes.vercel.app/reset-password/${resetToken}`;

    // Send reset password email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password. This link will expire in 15 minutes.</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in sending password reset email",
      error: error.message,
    });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.cookies["access-token"]
      ? jwt.verify(req.cookies["access-token"], process.env.secret).id
      : null;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Get the profile image file from Multer middleware
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Profile image file is required" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload image to Cloudinary using buffer upload
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = Readable.from(buffer);
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "smartstrokes/profiles",
            resource_type: "image",
            transformation: [
              { width: 400, height: 400, crop: "fill" },
              { quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.pipe(uploadStream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    // Update user's profile image with Cloudinary URL
    user.profileImage = result.secure_url;
    await user.save();

    // Return updated user info
    return res.status(200).json({
      message: "Profile image updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    return res.status(500).json({
      message: "Error updating profile image",
      error: error.message,
    });
  }
};

export const continueWithGoogle = async (req, res) => {
  try {
    const { displayName, email, photoURL } = req.body;
    console.log(email);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.secret, {
        expiresIn: "1d",
      });
      res
        .cookie("access-token", token, {
          httpOnly: true,

          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "User logged in successfully", user: existingUser });
    }

    const randomPassword = Math.random().toString(36).slice(-8);

    const newUser = new User({
      name: displayName,
      email,
      profileImage: photoURL,
      isVerified: true,
      password: randomPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.secret, {
      expiresIn: "1d",
    });

    res
      .cookie("access-token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "User registered Successfully", user: newUser });
  } catch (error) {}
};
