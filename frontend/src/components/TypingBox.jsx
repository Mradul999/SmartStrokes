"use client";

import { useState, useEffect, useRef, useContext } from "react";
import sampleParagraphs from "../data.json";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import auhtStore from "../store/store.js";
import { Navigate, NavLink } from "react-router-dom";
import { saveResult } from "../utils/saveResult.js";
import TypingresultStore from "../store/TypingResultStore.js";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const TypingBox = () => {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongKeyPresses, setWrongKeyPresses] = useState([]);
  const [weakKeyStats, setWeakKeyStats] = useState({});
  const [sampleText, setSampleText] = useState("");
  const [sampleWords, setSampleWords] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [visibleLineStart, setVisibleLineStart] = useState(0);
  const [linesPerView, setLinesPerView] = useState(3);

  const navigate = useNavigate();
  const textBoxRef = useRef(null);
  const timerRef = useRef(null);
  const livePerfRef = useRef(null);
  const textDisplayRef = useRef(null);

  const currentUser = auhtStore((state) => state.currentUser);
  const setTypingresult = TypingresultStore((state) => state.setTypingresult);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setRandomParagraph();
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);

  const reset = () => {
    setUserInput("");
    setStartTime(null);
    setTimeLeft(60);
    setWpm(0);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setCurrentWordIndex(0);
    setCursorPosition(0);
    setIsComplete(false);
    setWrongKeyPresses([]);
    setWeakKeyStats({});
    setVisibleLineStart(0);
    if (textBoxRef.current) {
      textBoxRef.current.focus();
    }
  };

  const setRandomParagraph = () => {
    const randomIndex = Math.floor(
      Math.random() * sampleParagraphs.paragraphs.length
    );
    let originalText = sampleParagraphs.paragraphs[randomIndex];

    // If the paragraph is too short, concatenate multiple paragraphs
    while (originalText.split(" ").length < 250) {
      const nextRandomIndex = Math.floor(
        Math.random() * sampleParagraphs.paragraphs.length
      );
      originalText += " " + sampleParagraphs.paragraphs[nextRandomIndex];
    }

    // Limit to around 300 words
    const words = originalText.split(" ");
    const shortenedWords = words.length > 300 ? words.slice(0, 300) : words;

    // Join back into a paragraph
    const newText = shortenedWords.join(" ");

    setSampleText(newText);
    setSampleWords(newText.split(" "));
    reset();
  };

  useEffect(() => {
    if (startTime && !isComplete && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsComplete(true);
            textBoxRef.current.blur();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [startTime]);

  // Update live WPM and accuracy every 2 seconds
  useEffect(() => {
    if (startTime && !isComplete && timeLeft > 0) {
      livePerfRef.current = setInterval(() => {
        // Calculate live WPM
        const timeElapsed = (Date.now() - startTime) / 60000;
        const wordsTyped = userInput.trim().split(/\s+/).length;
        const currentWpm = Math.floor(wordsTyped / (timeElapsed || 0.001));
        setLiveWpm(currentWpm);

        // Calculate live accuracy
        setLiveAccuracy(calculateAccuracy());
      }, 2000);
    }

    return () => clearInterval(livePerfRef.current);
  }, [startTime, userInput]);

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    setCursorPosition(userInput.length);

    if (isComplete || timeLeft === 0) {
      const timeElapsed =
        (startTime ? Date.now() - startTime : 0) / 60000 || 0.001;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const calculatedWpm = Math.floor(wordsTyped / timeElapsed);
      setWpm(calculatedWpm);

      // Format weakKeyStats for MongoDB Map storage
      const formattedWeakKeyStats = {};

      // Copy the weakKeyStats object properties
      Object.keys(weakKeyStats).forEach((key) => {
        formattedWeakKeyStats[key] = weakKeyStats[key];
      });

      // Calculate correct and incorrect characters
      let correctChars = 0;
      let incorrectChars = 0;

      for (let i = 0; i < userInput.length; i++) {
        if (i < sampleText.length && userInput[i] === sampleText[i]) {
          correctChars++;
        } else {
          incorrectChars++;
        }
      }

      const result = {
        userId: currentUser?._id,
        wpm: calculatedWpm,
        sampleText,
        wrongKeyPresses,
        weakKeyStats: formattedWeakKeyStats,
        accuracy: calculateAccuracy(),
        userInput,
        correctChars,
        incorrectChars,
      };

      setTypingresult(result);

      if (currentUser) {
        console.log("Saving result:", result);
        saveResult(result);
      }
    }
  }, [userInput, startTime, isComplete, timeLeft]);

  // Add this useEffect to handle line advancement
  useEffect(() => {
    if (!startTime || isComplete) return;

    // Get the current position within the formatted text
    const words = sampleText.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += 10) {
      lines.push(words.slice(i, i + 10));
    }

    // Determine which line we're on based on cursor position
    const currentCharIndex = userInput.length;
    let charCount = 0;
    let currentLineIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].join(" ").length + (i > 0 ? 1 : 0);
      charCount += lineLength;

      if (charCount > currentCharIndex) {
        currentLineIndex = i;
        break;
      }
    }

    // Advance the visible lines if needed
    if (currentLineIndex >= visibleLineStart + linesPerView - 1) {
      setVisibleLineStart(currentLineIndex - linesPerView + 2);
    }
  }, [
    userInput,
    sampleText,
    visibleLineStart,
    linesPerView,
    startTime,
    isComplete,
  ]);

  const handleKeyDown = (e) => {
    if (isComplete || timeLeft <= 0) {
      e.preventDefault();
      return;
    }

    // Handle Tab key for reset
    if (e.key === "Tab") {
      e.preventDefault();
      setRandomParagraph();
      return;
    }

    // Handle Enter key for completion
    if (e.key === "Enter") {
      e.preventDefault();
      setIsComplete(true);
      clearInterval(timerRef.current);
      clearInterval(livePerfRef.current);
      return;
    }

    // Handle Backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      if (userInput.length > 0) {
        setUserInput(userInput.slice(0, -1));
        setCursorPosition(cursorPosition - 1);
      }
      return;
    }

    // Only accept printable characters (length of 1) and not control keys
    if (e.key.length === 1) {
      e.preventDefault();

      // Start timer on first keystroke
      if (userInput.length === 0 && !startTime) {
        setStartTime(Date.now());
      }

      // Don't allow typing beyond the sample text length
      if (userInput.length >= sampleText.length) {
        return;
      }

      const newValue = userInput + e.key;

      // Check if character is correct
      const currentPosition = newValue.length - 1;
      const lastChar = e.key;
      const correspondingChar = sampleText[currentPosition];

      if (lastChar !== correspondingChar) {
        setWrongKeyPresses((prev) => [...prev, correspondingChar]);

        setWeakKeyStats((prev) => ({
          ...prev,
          [correspondingChar]: (prev[correspondingChar] || 0) + 1,
        }));
      }

      setUserInput(newValue);
      setCursorPosition(newValue.length);

      // Update word index based on spaces
      const spaceCount = (newValue.match(/ /g) || []).length;
      const newWordIndex = Math.min(spaceCount, sampleWords.length - 1);
      setCurrentWordIndex(newWordIndex);

      // Check if typing is complete
      if (newValue === sampleText) {
        setIsComplete(true);
        clearInterval(timerRef.current);
        clearInterval(livePerfRef.current);
      }
    }
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;

    let correctChars = 0;
    const minLength = Math.min(userInput.length, sampleText.length);

    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === sampleText[i]) {
        correctChars++;
      }
    }

    return Math.floor((correctChars / userInput.length) * 100);
  };

  const renderText = () => {
    // First, split sample text into words
    const words = sampleText.split(" ");

    // Group words into lines of 10 words each
    const lines = [];
    for (let i = 0; i < words.length; i += 10) {
      lines.push(words.slice(i, i + 10));
    }

    // Only display the current visible lines based on visibleLineStart
    const visibleLines = lines.slice(
      visibleLineStart,
      visibleLineStart + linesPerView
    );

    const currentIndex = userInput.length;

    return (
      <div className="relative text-lg md:text-xl lg:text-2xl leading-relaxed font-mono tracking-wide">
        {visibleLines.map((line, lineIndex) => {
          const actualLineIndex = lineIndex + visibleLineStart;

          return (
            <div key={actualLineIndex} className="mb-6">
              {line.map((word, wordIndex) => {
                // Calculate absolute position of this word in the original text
                const previousLines = lines.slice(0, actualLineIndex).flat();
                const wordsBeforeInText = [
                  ...previousLines,
                  ...line.slice(0, wordIndex),
                ];
                const charsBeforeWord =
                  wordsBeforeInText.join(" ").length +
                  (wordsBeforeInText.length > 0 ? 1 : 0);

                // Word start/end positions in the full text
                const wordStart = charsBeforeWord;
                const wordEnd = wordStart + word.length;

                // Determine if this word is the active word
                const isActiveWord =
                  currentIndex >= wordStart && currentIndex <= wordEnd;

                return (
                  <span
                    key={wordIndex}
                    className={`inline-block relative mr-2 ${
                      isActiveWord ? "active-word" : ""
                    }`}
                  >
                    {Array.from(word).map((char, charIndex) => {
                      const absoluteIndex = wordStart + charIndex;
                      const isCursor = absoluteIndex === cursorPosition;
                      const isTyped = absoluteIndex < userInput.length;
                      const isCorrect =
                        isTyped && userInput[absoluteIndex] === char;
                      const isError =
                        isTyped && userInput[absoluteIndex] !== char;

                      // Apply appropriate styling with improved dark mode colors
                      let charClass = "transition-all duration-100 relative ";

                      if (isTyped) {
                        if (isCorrect) {
                          charClass +=
                            theme === "dark"
                              ? "text-green-300 font-bold"
                              : "text-green-600 font-bold";
                        } else {
                          charClass +=
                            theme === "dark"
                              ? "text-red-300 bg-red-900/40 rounded"
                              : "text-red-600 bg-red-100 rounded";
                        }
                      } else {
                        charClass +=
                          theme === "dark" ? "text-gray-500" : "text-gray-400";
                      }

                      return (
                        <span key={charIndex} className={charClass}>
                          {char}
                          {isCursor && (
                            <span
                              className={`absolute -bottom-1 left-0 h-1 w-full ${
                                theme === "dark"
                                  ? "bg-purple-400"
                                  : "bg-purple-500"
                              } animate-pulse`}
                            ></span>
                          )}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </div>
          );
        })}

        {/* Show progress indicator at the bottom */}
        <div
          className={`text-xs font-medium mt-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {visibleLineStart > 0 && "..."}
          Lines {visibleLineStart + 1}-
          {Math.min(visibleLineStart + linesPerView, lines.length)} of{" "}
          {lines.length}
          {visibleLineStart + linesPerView < lines.length && "..."}
        </div>
      </div>
    );
  };

  const setAiGeneratedtext = async () => {
    try {
      SetLoading(true);

      const problemKeys = Object.entries(weakKeyStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([key]) => key);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/text/gettext`,
        { misTypes: problemKeys.length > 0 ? problemKeys : wrongKeyPresses },
        { withCredentials: true }
      );

      if (response.status === 200) {
        SetLoading(false);
        setSampleText(response.data.message);
        setSampleWords(response.data.message.split(" "));
        reset();
      }
    } catch (error) {
      SetLoading(false);
      alert("Failed to generate AI text");
    }
  };

  // Keyboard mapping for visual keyboard
  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const getKeyClass = (key) => {
    const isWeakKey =
      Boolean(weakKeyStats[key]) || wrongKeyPresses.includes(key);

    let baseClass =
      "w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center uppercase font-medium border text-sm transition-all ";

    if (isWeakKey) {
      baseClass += "bg-red-100 border-red-300 text-red-800 ";
    } else {
      baseClass += "bg-white border-gray-200 text-gray-700 ";
    }

    if (showKeyboard) {
      baseClass +=
        "transform hover:scale-105 hover:bg-purple-50 hover:border-purple-200 ";
    }

    return baseClass;
  };

  const renderKeyboard = () => {
    if (!showKeyboard) return null;

    return (
      <div className="mb-6 p-6 border border-gray-200 rounded-xl bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          {keyboardRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-1.5"
              style={{ paddingLeft: rowIndex * 12 }}
            >
              {row.map((key) => (
                <div
                  key={key}
                  className={getKeyClass(key)}
                  data-tips={
                    weakKeyStats[key] ? `${weakKeyStats[key]} errors` : null
                  }
                >
                  {key}
                  {weakKeyStats[key] && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                      {weakKeyStats[key]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="mt-2 flex gap-1.5">
            <div className="w-32 md:w-64 h-8 md:h-10 rounded-md flex items-center justify-center bg-white border border-gray-200 text-gray-700">
              space
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add this function to calculate the overall typing skill level
  const calculateSkillLevel = () => {
    // Only calculate if we have completed a test
    if (!isComplete && timeLeft > 0) return "Beginner";

    const accuracy = calculateAccuracy();

    // Base the skill level on a combination of WPM and accuracy
    // This creates a weighted score where accuracy is heavily valued
    const weightedScore = wpm * (accuracy / 100);

    if (weightedScore >= 90) return "Master";
    if (weightedScore >= 70) return "Expert";
    if (weightedScore >= 50) return "Advanced";
    if (weightedScore >= 30) return "Intermediate";
    if (weightedScore >= 15) return "Improving";
    return "Beginner";
  };

  // Add function to get skill level color
  const getSkillLevelColor = () => {
    const level = calculateSkillLevel();

    if (theme === "dark") {
      switch (level) {
        case "Master":
          return "text-yellow-300";
        case "Expert":
          return "text-fuchsia-300";
        case "Advanced":
          return "text-cyan-300";
        case "Intermediate":
          return "text-emerald-300";
        case "Improving":
          return "text-indigo-300";
        default:
          return "text-gray-300";
      }
    } else {
      switch (level) {
        case "Master":
          return "text-yellow-600";
        case "Expert":
          return "text-purple-600";
        case "Advanced":
          return "text-blue-600";
        case "Intermediate":
          return "text-green-600";
        case "Improving":
          return "text-indigo-600";
        default:
          return "text-gray-600";
      }
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-4 md:p-6 font-sans transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      } ${theme === "dark" ? "text-white" : ""}`}
    >
      <div className="text-center mb-8">
        <h1
          className={`text-3xl md:text-4xl text-center font-bold mb-2 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          }`}
        >
          Speed Typing Test
        </h1>
        <p
          className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          Improve your typing speed and accuracy with practice
        </p>
      </div>

      {/* Live Stats Bar with improved dark mode gradients */}
      <div
        className={`shadow-lg rounded-xl mb-6 p-4 flex justify-between items-center ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700"
            : "bg-white border border-gray-100"
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div
              className={`text-xs uppercase tracking-wide mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Time
            </div>
            <div
              className={`text-2xl font-bold flex items-center ${
                timeLeft < 10
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {timeLeft}s
            </div>
          </div>

          <div
            className={`h-12 w-0.5 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>

          <div className="flex flex-col items-center">
            <div
              className={`text-xs uppercase tracking-wide mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              WPM
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {startTime ? liveWpm : "-"}
            </div>
          </div>

          <div
            className={`h-12 w-0.5 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>

          <div className="flex flex-col items-center">
            <div
              className={`text-xs uppercase tracking-wide mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Accuracy
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {startTime ? liveAccuracy : "-"}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`text-xs uppercase tracking-wide mb-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Progress
            </div>
            <div
              className={`text-sm font-medium flex items-center ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <span className="text-purple-600 font-bold">
                {Math.min(currentWordIndex + 1, sampleWords.length)}
              </span>
              <span className="mx-1">/</span>
              <span>{sampleWords.length}</span>
              <span className="ml-1">words</span>
            </div>
          </div>

          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`p-1.5 rounded-lg transition-colors ${
              theme === "dark"
                ? showKeyboard
                  ? "bg-purple-900/50 text-purple-300"
                  : "bg-gray-700 text-gray-300"
                : showKeyboard
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-600"
            }`}
            title={showKeyboard ? "Hide keyboard" : "Show keyboard"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v12M6 12h12"
              />
            </svg>
          </button>
        </div>
      </div>

      {showKeyboard && renderKeyboard()}

      {/* Main typing area with enhanced dark mode appearance */}
      <div
        ref={textBoxRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`mb-6 p-6 md:p-10 rounded-xl outline-none transition-colors duration-200 ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500"
            : "bg-white border border-gray-200 shadow-lg focus:ring-2 focus:ring-purple-300"
        } ${
          isFocused
            ? theme === "dark"
              ? "ring-2 ring-purple-500"
              : "ring-2 ring-purple-300"
            : ""
        }`}
      >
        {renderText()}

        <div
          className={`mt-4 text-xs ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Press Tab to restart | Press Enter to complete | Press Backspace to
          correct
        </div>
      </div>

      {/* Buttons with enhanced dark mode styling */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={setRandomParagraph}
          className={`flex items-center px-6 py-3 text-white rounded-xl shadow-md transform transition-all hover:-translate-y-0.5 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-900"
              : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          } ${loading && "opacity-50 pointer-events-none"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {timeLeft == 60 && "New Text"}
        </button>

        <button
          onClick={() => {
            if (currentUser) {
              setAiGeneratedtext();
            } else {
              navigate("/signin");
            }
          }}
          className={`flex items-center px-6 py-3 text-white rounded-xl shadow-md transform transition-all hover:-translate-y-0.5 ${
            theme === "dark"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 hover:from-indigo-800 hover:to-blue-900"
              : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
          } ${loading && "opacity-50 pointer-events-none"}`}
        >
          {" "}
          {currentUser ? (
            <div className="flex items-center">
              {loading ? (
                <ClipLoader size={20} color="#fff" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  AI Practice
                </>
              )}
            </div>
          ) : (
            <span>Login to practice with AI</span>
          )}
        </button>
      </div>

      {/* Results section with improved dark mode styling */}
      {isComplete && (
        <div className="mt-6 space-y-5">
          <div
            className={`rounded-xl p-6 shadow-sm ${
              theme === "dark"
                ? "bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-emerald-800"
                : "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-xl font-bold flex items-center ${
                  theme === "dark" ? "text-emerald-300" : "text-green-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Test Completed!
              </h3>
              <button
                onClick={setRandomParagraph}
                className={`text-sm font-medium flex items-center ${
                  theme === "dark"
                    ? "text-emerald-300 hover:text-emerald-200"
                    : "text-green-700 hover:text-green-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
            </div>

            {/* Add skill level indicator */}
            <div
              className={`mb-4 flex items-center justify-center py-3 rounded-lg ${
                theme === "dark" ? "bg-gray-800/80" : "bg-white"
              } shadow-sm`}
            >
              <div className="text-center">
                <div
                  className={`text-xs uppercase tracking-wide mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Your Skill Level
                </div>
                <div className={`text-2xl font-bold ${getSkillLevelColor()}`}>
                  {calculateSkillLevel()}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Based on WPM ({wpm}) and Accuracy ({calculateAccuracy()}%)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div
                className={`p-3 rounded-lg shadow-sm relative overflow-hidden ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`text-xs uppercase tracking-wide mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Speed
                </div>
                <div
                  className={`text-2xl font-bold flex items-baseline ${
                    theme === "dark" ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  {wpm}
                  <span
                    className={`ml-1 text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    WPM
                  </span>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 ${
                    theme === "dark" ? "bg-purple-500" : "bg-purple-600"
                  }`}
                  style={{ width: `${Math.min(100, wpm)}%` }}
                ></div>
              </div>

              <div
                className={`p-3 rounded-lg shadow-sm relative overflow-hidden ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`text-xs uppercase tracking-wide mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Accuracy
                </div>
                <div
                  className={`text-2xl font-bold flex items-baseline ${
                    theme === "dark" ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  {calculateAccuracy()}
                  <span
                    className={`ml-1 text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    %
                  </span>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 ${
                    theme === "dark" ? "bg-purple-500" : "bg-purple-600"
                  }`}
                  style={{ width: `${calculateAccuracy()}%` }}
                ></div>
              </div>

              <div
                className={`p-3 rounded-lg shadow-sm relative overflow-hidden ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`text-xs uppercase tracking-wide mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Characters
                </div>
                <div
                  className={`text-2xl font-bold flex items-baseline ${
                    theme === "dark" ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  {userInput.length}
                  <span
                    className={`ml-1 text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    chars
                  </span>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 ${
                    theme === "dark" ? "bg-purple-500" : "bg-purple-600"
                  }`}
                  style={{ width: `${Math.min(100, userInput.length / 5)}%` }}
                ></div>
              </div>

              <div
                className={`p-3 rounded-lg shadow-sm relative overflow-hidden ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`text-xs uppercase tracking-wide mb-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Time
                </div>
                <div
                  className={`text-2xl font-bold flex items-baseline ${
                    theme === "dark" ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  {60 - timeLeft}
                  <span
                    className={`ml-1 text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    sec
                  </span>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 ${
                    theme === "dark" ? "bg-purple-500" : "bg-purple-600"
                  }`}
                  style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
                ></div>
              </div>
            </div>

            {Object.keys(weakKeyStats).length > 0 && (
              <div
                className={`p-4 rounded-lg shadow-sm ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h4
                  className={`text-sm font-medium mb-2 flex items-center ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 mr-1 ${
                      theme === "dark" ? "text-purple-400" : "text-purple-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Keys to Practice
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(weakKeyStats)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([key, count], index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm ${
                          theme === "dark"
                            ? "bg-purple-900/40 border border-purple-800 text-purple-300"
                            : "bg-purple-50 border border-purple-100 text-purple-700"
                        }`}
                      >
                        <span
                          className={`font-mono mr-2 px-2 py-0.5 rounded shadow-inner font-bold ${
                            theme === "dark"
                              ? "bg-gray-800 border border-purple-800 text-purple-300"
                              : "bg-white border border-purple-100 text-purple-700"
                          }`}
                        >
                          {key}
                        </span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                            theme === "dark"
                              ? "bg-purple-800 text-purple-200"
                              : "bg-purple-200 text-purple-800"
                          }`}
                        >
                          {count}
                        </span>
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>

          {!currentUser && (
            <div
              className={`rounded-xl p-6 shadow-sm text-center ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-indigo-800"
                  : "bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100"
              }`}
            >
              <p
                className={
                  theme === "dark" ? "text-gray-300 mb-3" : "text-gray-700 mb-3"
                }
              >
                Save your results and track your progress
              </p>
              <NavLink
                to="/signin"
                className={`inline-flex items-center px-4 py-2 rounded-lg shadow-sm transition-colors ${
                  theme === "dark"
                    ? "bg-purple-700 text-white hover:bg-purple-600"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In Now
              </NavLink>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .active-word {
          position: relative;
        }

        .active-word::before {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 0.25rem;
          background-color: ${theme === "dark"
            ? "rgba(124, 58, 237, 0.25)"
            : "rgba(124, 58, 237, 0.08)"};
          z-index: -1;
        }

        [data-tips]:hover::after {
          content: attr(data-tips);
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: ${theme === "dark" ? "#6d28d9" : "#4c1d95"};
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          white-space: nowrap;
          z-index: 10;
          box-shadow: ${theme === "dark"
            ? "0 4px 6px rgba(0, 0, 0, 0.5)"
            : "0 2px 4px rgba(0, 0, 0, 0.2)"};
        }
      `}</style>
    </div>
  );
};

export default TypingBox;
