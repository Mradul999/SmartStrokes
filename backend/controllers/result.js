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

    const { wpm, sampleText, wrongKeyPresses, accuracy, userInput, weakKeyStats } = req.body;

    console.log(wrongKeyPresses);

    const result = new UserTypingSession({
      userId,
      wpm,
      textGiven: sampleText,
      textTyped: userInput,
      weakKeys: wrongKeyPresses,
      accuracy,
      weakKeyStats: weakKeyStats || {},
      createdAt: new Date()
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

export const getUserPerformance = async (req, res) => {
  try {
    const token = req.cookies["access-token"];

    if (!token) {
      return res.status(401).json({ message: "unauthorized: no token provided" });
    }

    const decoded = jwt.verify(token, process.env.secret);
    const userId = decoded.id;

    // Get the last 7 sessions
    const sessions = await UserTypingSession.find({ userId })
      .sort({ createdAt: -1 })
      .limit(7);

    // Calculate average performance
    const totalWpm = sessions.reduce((sum, session) => sum + Number(session.wpm), 0);
    const totalAccuracy = sessions.reduce((sum, session) => sum + Number(session.accuracy), 0);
    const averageWpm = sessions.length > 0 ? Math.round(totalWpm / sessions.length) : 0;
    const averageAccuracy = sessions.length > 0 ? Math.round(totalAccuracy / sessions.length) : 0;

    // Get most common weak keys with their counts
    const weakKeyStats = {};
    
    sessions.forEach(session => {
      // Process the weak keys array
      session.weakKeys.forEach(key => {
        weakKeyStats[key] = (weakKeyStats[key] || 0) + 1;
      });
      
      // Process the detailed statistics if available
      if (session.weakKeyStats) {
        const statsMap = session.weakKeyStats;
        // Convert Map to object if needed
        const stats = statsMap instanceof Map ? Object.fromEntries(statsMap) : statsMap;
        
        Object.entries(stats).forEach(([key, count]) => {
          weakKeyStats[key] = (weakKeyStats[key] || 0) + count;
        });
      }
    });

    const sortedWeakKeys = Object.entries(weakKeyStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Ensure WPM and accuracy are numbers
    const formattedSessions = sessions.map(session => ({
      ...session.toObject(),
      wpm: Number(session.wpm),
      accuracy: Number(session.accuracy)
    }));

    res.status(200).json({
      sessions: formattedSessions,
      averageWpm,
      averageAccuracy,
      weakKeys: sortedWeakKeys.map(([key]) => key),
      weakKeyStats: Object.fromEntries(sortedWeakKeys),
      totalSessions: sessions.length
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in fetching user performance", error: error.message });
  }
};
