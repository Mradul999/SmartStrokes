import UserTypingSession from "../models/UserTypingSession.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
export const saveResult = async (req, res) => {
  try {
    const token = req.cookies["access-token"];
    // console.log("token", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized :no token provided" });
    }

    const decoded = jwt.verify(token, process.env.secret);
    const userId = decoded.id;
    // console.log("userid ", userId);

    const { wpm, sampleText, wrongKeyPresses, accuracy, userInput } = req.body;
    

    console.log(wrongKeyPresses);

    const result = new UserTypingSession({
      userId,
      wpm,
      textGiven: sampleText,
      textTyped: userInput,
      weakKeys: wrongKeyPresses,
      accuracy,
    });
    await result.save();

    res.status(200).json({ message: "result saved successfully", result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error in saving result", error: error.message });
  }
};
