import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const textGenerate = async (req, res) => {
  const prompt =
    "Generate a 60-word passage. Make it grammatically correct and interesting.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    res.status(200).json({ message: response.text });
    console.log(response.text);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate text using Gemini API" });
  }
};
