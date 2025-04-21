import express from "express";
import { SignUp, login, verifyOTP } from "../controllers/Auth.js";

const router = express.Router();
router.post("/signup", SignUp);
router.post("/verify", verifyOTP);
router.post("/login", login);

export default router;
