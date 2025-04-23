import express from "express";
import { SignUp, login, logout, verifyOTP } from "../controllers/Auth.js";

const router = express.Router();
router.post("/signup", SignUp);
router.post("/verify", verifyOTP);
router.post("/login", login);
router.get("/logout", logout);

export default router;
