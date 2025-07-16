import express from "express";
import { createOrder, verifyOrder } from "../controllers/payment.js";

const router = express.Router();

router.post("/createorder", createOrder);
router.post("/verify", verifyOrder);

export default router;
