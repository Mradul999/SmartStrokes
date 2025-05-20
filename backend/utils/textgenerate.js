import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const textGenerate = async (req, res) => {
  const wrongKeyPresses = req.body.misTypes;

  const prompt = `generate a 200 word grammatically correct passage in english using both lower case and upper case with punctuations like full stop ,commas  marks make the tone engaging and interesting additionally use the following letters  from the array (${wrongKeyPresses}).(If this array is empty ignore)  more frequently throughout the passage to help the user practice and improve their typing accuracy for these specific keys`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    res.status(200).json({ message: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate text using Gemini API" });
  }
};
