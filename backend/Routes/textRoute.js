import express from "express";

import { textGenerate } from "../utils/textgenerate.js";

const router = express.Router();
router.post("/gettext", textGenerate);

export default router;
