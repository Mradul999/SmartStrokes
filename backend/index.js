import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnect } from "./config/dbconnect.js";

dotenv.config();
dbconnect();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
