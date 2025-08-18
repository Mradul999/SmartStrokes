import express from "express";

import { textGenerate } from "../utils/textgenerate.js";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  getMySubscription,
  validateDailyUsage,
} from "../controllers/subscription.js";

const router = express.Router();
router.post("/gettext", checkAuth, validateDailyUsage, textGenerate);

export default router;
