import express from "express";
import { saveResult, getUserPerformance } from "../controllers/result.js";

const router = express.Router();
router.post("/saveresult", saveResult);
router.get("/performance", getUserPerformance);

export default router;
