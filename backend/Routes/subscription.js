import express from "express";
import {
  createSubscription,
  getMySubscription,
  checkAndUpdateExpiredSubscriptions,
} from "../controllers/subscription.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/createsubscription", checkAuth, createSubscription);
router.get("/mysubscription", checkAuth, getMySubscription);
router.post("/check-expired", checkAuth, checkAndUpdateExpiredSubscriptions);

export default router;
