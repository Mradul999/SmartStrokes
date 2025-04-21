import express from "express";
import { SignUp } from "../controllers/Auth.js";

const router = express.Router();
router.post("/signup", SignUp);

export default router;
