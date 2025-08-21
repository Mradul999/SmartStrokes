"use client";

import { useState, useEffect, useRef, useContext } from "react";
import sampleParagraphs from "../data.json";
import axios from "axios";
import auhtStore from "../store/store.js";
import { saveResult } from "../utils/saveResult.js";
import TypingresultStore from "../store/TypingResultStore.js";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import TypingStats from "./typing/TypingStats";
import TypingTextDisplay from "./typing/TypingTextDisplay";
import TypingKeyboard from "./typing/TypingKeyboard";
import TypingControls from "./typing/TypingControls";
import TypingResults from "./typing/TypingResults";

const TypingBox = () => {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [userSelectedtime, SetUserSelectedtime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongKeyPresses, setWrongKeyPresses] = useState([]);
  const [weakKeyStats, setWeakKeyStats] = useState({});
  const [sampleText, setSampleText] = useState("");
  const [sampleWords, setSampleWords] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [visibleLineStart, setVisibleLineStart] = useState(0);
  const [linesPerView, setLinesPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const textBoxRef = useRef(null);
  const timerRef = useRef(null);
  const livePerfRef = useRef(null);
  const mobileInputRef = useRef(null);
  const resultsRef = useRef(null);

  const currentUser = auhtStore((state) => state.currentUser);
  const setTypingresult = TypingresultStore((state) => state.setTypingresult);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    setCurrentWordIndex(0);
    setCursorPosition(0);
    setIsComplete(false);
    setWrongKeyPresses([]);
    setWeakKeyStats({});
    setVisibleLineStart(0);
    if (isMobile && mobileInputRef.current) {
      mobileInputRef.current.focus();
    } else if (textBoxRef.current) {
      textBoxRef.current.focus();
    }
  };

  const setRandomParagraph = () => {
    const randomIndex = Math.floor(
      Math.random() * sampleParagraphs.paragraphs.length
    );
    let originalText = sampleParagraphs.paragraphs[randomIndex];

    while (originalText.split(" ").length < 250) {
      const nextRandomIndex = Math.floor(
        Math.random() * sampleParagraphs.paragraphs.length
      );
      originalText += " " + sampleParagraphs.paragraphs[nextRandomIndex];
    }

    const words = originalText.split(" ");
    const shortenedWords = words.length > 300 ? words.slice(0, 300) : words;

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

      const formattedWeakKeyStats = {};

      Object.keys(weakKeyStats).forEach((key) => {
        formattedWeakKeyStats[key] = weakKeyStats[key];
      });

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
        saveResult(result);
      }
    }
  }, [userInput, startTime, isComplete, timeLeft]);

  useEffect(() => {
    if (!startTime || isComplete) return;

    const words = sampleText.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += 10) {
      lines.push(words.slice(i, i + 10));
    }

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

  useEffect(() => {
    if (isComplete && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isComplete]);

  const handleTab = (e) => {
    e.preventDefault();
    setRandomParagraph();
  };

  const handleEnter = (e) => {
    e.preventDefault();
    setIsComplete(true);
    clearInterval(timerRef.current);
    clearInterval(livePerfRef.current);
  };

  const handleBackspace = (e) => {
    e.preventDefault();
    if (userInput.length > 0) {
      setUserInput(userInput.slice(0, -1));
      setCursorPosition(cursorPosition - 1);
    }
  };

  const handlePrintableChar = (e) => {
    e.preventDefault();

    if (userInput.length === 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length >= sampleText.length) {
      return;
    }

    const newValue = userInput + e.key;

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

    const spaceCount = (newValue.match(/ /g) || []).length;
    const newWordIndex = Math.min(spaceCount, sampleWords.length - 1);
    setCurrentWordIndex(newWordIndex);

    if (newValue === sampleText) {
      setIsComplete(true);
      clearInterval(timerRef.current);
      clearInterval(livePerfRef.current);
    }
  };

  const handleKeyDown = (e) => {
    if (isComplete || timeLeft <= 0) {
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case "Tab":
        handleTab(e);
        break;
      case "Enter":
        handleEnter(e);
        break;
      case "Backspace":
        handleBackspace(e);
        break;
      default:
        if (e.key.length === 1) {
          handlePrintableChar(e);
        }
        break;
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

      if (response.status === 404) {
        toast.error(
          "No active subscription found. Please subscribe to a plan first"
        );
        return;
      }

      if (response.status === 200) {
        SetLoading(false);
        setSampleText(response.data.message);
        setSampleWords(response.data.message.split(" "));
        reset();
      }
    } catch (error) {
      SetLoading(false);
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 404) {
          toast.error(
            "No active subscription found. Please subscribe to a plan first"
          );
        } else if (error.response.status === 403) {
          toast.error("Your subscription has expired. Please renew.");
        } else if (error.response.status === 429) {
          toast.error("Daily usage limit reached. Try again tomorrow.");
        } else {
          toast.error(error.response.data.message || "Something went wrong!");
        }
      } else {
        // Error setting up request
        toast.error("Failed to generate AI text.");
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
          className={`text-3xl md:text-4xl text-center font-bold pb-2 mb-2 ${
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
      <TypingStats
        timeLeft={timeLeft}
        currentWordIndex={currentWordIndex}
        sampleWords={sampleWords}
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        setTimeLeft={setTimeLeft}
        userSelectedtime={userSelectedtime}
      />

      {showKeyboard && (
        <TypingKeyboard
          showKeyboard={showKeyboard}
          weakKeyStats={weakKeyStats}
          wrongKeyPresses={wrongKeyPresses}
        />
      )}

      {/* Main typing area with enhanced dark mode appearance */}
      <div className="relative mb-6">
        <input
          ref={textBoxRef}
          type="text"
          value={userInput}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > sampleText.length) return;
            setUserInput(value);
            setCursorPosition(value.length);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full  h-[300px] p-4 md:p-10 rounded-xl outline-none transition-colors duration-200 text-transparent caret-transparent resize-none ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 [color-scheme:dark]"
              : "bg-white border border-gray-200 shadow-lg focus:ring-2 focus:ring-purple-300"
          } ${
            isFocused
              ? theme === "dark"
                ? "ring-2 ring-purple-500"
                : "ring-2 ring-purple-300"
              : ""
          }`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <div className="absolute inset-0 p-4 md:p-10 pointer-events-none overflow-y-auto">
          <TypingTextDisplay
            sampleText={sampleText}
            userInput={userInput}
            cursorPosition={cursorPosition}
            visibleLineStart={visibleLineStart}
            linesPerView={linesPerView}
          />
        </div>

        <div
          className={`mt-4 text-xs hidden sm:block ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Press Tab to restart | Press Enter to complete | Press Backspace to
          correct
        </div>
      </div>

      {/* Buttons with enhanced dark mode styling */}
      <TypingControls
        setRandomParagraph={setRandomParagraph}
        setAiGeneratedtext={setAiGeneratedtext}
        currentUser={currentUser}
        loading={loading}
        timeLeft={timeLeft}
        isComplete={isComplete}
        navigate={navigate}
        startTime={startTime}
      />

      {/* Results section with improved dark mode styling */}
      <TypingResults
        isComplete={isComplete}
        resultsRef={resultsRef}
        setRandomParagraph={setRandomParagraph}
        calculateSkillLevel={calculateSkillLevel}
        getSkillLevelColor={getSkillLevelColor}
        wpm={wpm}
        calculateAccuracy={calculateAccuracy}
        userInput={userInput}
        weakKeyStats={weakKeyStats}
        currentUser={currentUser}
        timeLeft={timeLeft}
      />

      {/* Add mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          input[type="text"] {
            font-size: 16px !important; /* Prevents zoom on iOS */
            -webkit-text-fill-color: transparent !important; /* Hides text on iOS */
            -webkit-appearance: none;
            margin: 0;
          }

          .absolute.inset-0 {
            font-size: 14px;
            line-height: 1.5;
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .absolute.inset-0::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .absolute.inset-0 {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Ensure text is hidden in dark mode */
        .dark-theme input[type="text"] {
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
          text-fill-color: transparent !important;
        }

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
      <Toaster reverseOrder={false} />
    </div>
  );
};

export default TypingBox;
