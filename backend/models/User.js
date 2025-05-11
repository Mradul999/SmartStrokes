import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
    },
    profileImage: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/modern-random-cartoon-sticker-detailed-illustrated-isolated-white-background-modern-random-cartoon-sticker-detailed-illustrated-353166857.jpg",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
