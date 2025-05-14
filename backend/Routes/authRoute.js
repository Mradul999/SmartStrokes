import express from "express";
import {
  SignUp,
  login,
  logout,
  verifyOTP,
  updateProfileImage,
  continueWithGoogle,
} from "../controllers/Auth.js";
import upload from "../middlewares/multerUpload.js";

const router = express.Router();
router.post("/signup", SignUp);
router.post("/verify", verifyOTP);
router.post("/login", login);
router.get("/logout", logout);
router.post(
  "/update-profile-image",
  upload.single("profileImage"),
  updateProfileImage
);
router.post("/continuewithgoogle", continueWithGoogle);

export default router;
