import express from "express";
import { createOrder, verifyOrder } from "../controllers/payment.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/createorder", checkAuth, createOrder);
router.post("/verify", verifyOrder);

export default router;
