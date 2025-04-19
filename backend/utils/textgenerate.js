import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const textGenerate = async () => {
  console.log(process.env.OPENAI_API_KEY);
  const prompt =
    "Generate a 60 words  passage .make it gramatically correct and interesting ";
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: user, content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.status(200).json({ response });
    console.log(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to generate text" });
  }
};
