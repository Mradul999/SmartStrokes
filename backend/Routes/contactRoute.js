import express from "express";
import { submitContactForm } from "../controllers/contact.js";

import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/submit", checkAuth, submitContactForm);

export default router;
