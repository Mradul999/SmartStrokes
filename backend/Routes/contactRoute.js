import express from "express";
import { submitContactForm } from "../controllers/contact.js";

const router = express.Router();

router.post("/submit", submitContactForm);

export default router; 