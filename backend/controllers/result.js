import UserTypingSession from "../models/UserTypingSession.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
export const saveResult = async (req, res) => {
  try {
    const token = req.cookies["access-token"];
    console.log("token", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized :no token provided" });
    }

    const decoded = jwt.verify(token, process.env.secret);
    const userId = decoded.id;
    // console.log("userid ", userId);

    const {
      wpm,
      sampleText,
      wrongKeyPresses,
      weakKeyStats,
      accuracy,
      userInput,
      correctChars,
      incorrectChars,
    } = req.body;
    // console.log("wpm", wpm);
    // console.log("sampleText", sampleText);
    // console.log("wrongKeyPresses", wrongKeyPresses);

    // Ensure WPM is a number
    const numericWpm = Number(wpm) || 0;
    // If WPM is still 0 but the user has typed content, calculate it
    let finalWpm = numericWpm;
    if (finalWpm === 0 && userInput && userInput.length > 0) {
      // Approximate calculation based on 5 characters per word standard
      finalWpm = Math.round(userInput.length / 5);
    }

    const result = new UserTypingSession({
      userId,
      wpm: finalWpm,
      textGiven: sampleText,
      textTyped: userInput,
      correctChars: correctChars || 0,
      incorrectChars: incorrectChars || 0,
      weakKeys: wrongKeyPresses,
      weakKeyStats,
      accuracy: Number(accuracy) || 0,
      createdAt: new Date(),
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
    console.log("token", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "unauthorized: no token provided" });
    }

    const decoded = jwt.verify(token, process.env.secret);
    const userId = decoded.id;

    // Get all user sessions
    const allSessions = await UserTypingSession.find({ userId }).sort({
      createdAt: -1,
    });

    // Filter out sessions with zero WPM if there are alternatives
    const validSessions = allSessions.filter(
      (session) => Number(session.wpm) > 0
    );

    // If all sessions have zero WPM, keep them all
    const sessions =
      validSessions.length > 0
        ? validSessions.slice(0, 7)
        : allSessions.slice(0, 7);

    // Calculate average performance only from non-zero values
    const wpmValues = sessions
      .map((session) => Number(session.wpm))
      .filter((wpm) => wpm > 0);

    const accuracyValues = sessions
      .map((session) => Number(session.accuracy))
      .filter((accuracy) => accuracy > 0);

    const averageWpm =
      wpmValues.length > 0
        ? Math.round(
            wpmValues.reduce((sum, val) => sum + val, 0) / wpmValues.length
          )
        : 0;

    const averageAccuracy =
      accuracyValues.length > 0
        ? Math.round(
            accuracyValues.reduce((sum, val) => sum + val, 0) /
              accuracyValues.length
          )
        : 0;

    // Get most common weak keys with their counts
    const weakKeyStats = {};

    sessions.forEach((session) => {
      // Process the weak keys array
      if (session.weakKeys && session.weakKeys.length > 0) {
        session.weakKeys.forEach((key) => {
          weakKeyStats[key] = (weakKeyStats[key] || 0) + 1;
        });
      }

      // Process the detailed statistics if available
      if (
        session.weakKeyStats &&
        Object.keys(session.weakKeyStats).length > 0
      ) {
        const statsMap = session.weakKeyStats;
        // Convert Map to object if needed
        const stats =
          statsMap instanceof Map ? Object.fromEntries(statsMap) : statsMap;

        Object.entries(stats).forEach(([key, count]) => {
          weakKeyStats[key] = (weakKeyStats[key] || 0) + count;
        });
      }
    });

    const sortedWeakKeys = Object.entries(weakKeyStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Ensure WPM and accuracy are numbers and non-zero
    const formattedSessions = sessions.map((session) => {
      const wpm = Number(session.wpm) || 0;
      const accuracy = Number(session.accuracy) || 0;

      // If WPM is zero but text was typed, calculate a rough estimate
      let calculatedWpm = wpm;
      if (wpm === 0 && session.textTyped && session.textTyped.length > 0) {
        // Standard typing test measurement: 5 characters = 1 word
        calculatedWpm = Math.round(session.textTyped.length / 5);
      }

      return {
        ...session.toObject(),
        wpm: calculatedWpm,
        accuracy: accuracy,
      };
    });

    res.status(200).json({
      sessions: formattedSessions,
      averageWpm,
      averageAccuracy,
      weakKeys: sortedWeakKeys.map(([key]) => key),
      weakKeyStats: Object.fromEntries(sortedWeakKeys),
      totalSessions: allSessions.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetching user performance",
      error: error.message,
    });
  }
};
