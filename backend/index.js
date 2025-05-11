import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnect } from "./config/dbconnect.js";
import textRoute from "./Routes/textRoute.js";
import { test } from "./controllers/test.js";
import cookieParser from "cookie-parser";

import authRoute from "./Routes/authRoute.js";
import resultRoute from "./Routes/resultRoute.js";
import contactRoute from "./Routes/contactRoute.js";

dotenv.config();
dbconnect();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/text", textRoute);
app.use("/api/auth", authRoute);
app.use("/api/result", resultRoute);
app.use("/api/contact", contactRoute);

// Simple test route to verify server connectivity
app.get("/api/test", (req, res) => {
  res.status(200).json({ 
    message: "Server is running properly", 
    timestamp: new Date().toISOString() 
  });
});

// app.get("/test", test);

// console.log("current port=>", process.env.PORT);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
