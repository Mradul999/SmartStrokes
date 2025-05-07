import express from "express";
import { saveResult } from "../controllers/result.js";

const router = express.Router();
router.post("/saveresult", saveResult);
export default router;
