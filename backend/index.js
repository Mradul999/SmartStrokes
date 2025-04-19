import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnect } from "./config/dbconnect.js";
import textRoute from "./Routes/textRoute.js";
import { test } from "./controllers/test.js";

dotenv.config();
dbconnect();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/text", textRoute);

app.get("/test", test);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
