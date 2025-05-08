"use client";

import { useState, useEffect, useRef } from "react";
import sampleParagraphs from "../data.json";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import auhtStore from "../store/store.js";
import { NavLink } from "react-router-dom";
import { saveResult } from "../utils/saveResult.js";
import TypingresultStore from "../store/TypingResultStore.js";

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

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const livePerfRef = useRef(null);
  const textDisplayRef = useRef(null);

  const currentUser = auhtStore((state) => state.currentUser);
  const setTypingresult = TypingresultStore((state) => state.setTypingresult);

  useEffect(() => {
    setRandomParagraph();
    inputRef.current.focus();
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
    inputRef.current.focus();
  };

  const setRandomParagraph = () => {
    const randomIndex = Math.floor(
      Math.random() * sampleParagraphs.paragraphs.length
    );
    const newText = sampleParagraphs.paragraphs[randomIndex];
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
            inputRef.current.blur();
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
      setWpm(Math.floor(wordsTyped / timeElapsed));
    }

    // Scroll to keep cursor visible
    if (textDisplayRef.current) {
      const textContainer = textDisplayRef.current;
      const cursorElement = textContainer.querySelector('.cursor-position');
      
      if (cursorElement) {
        const containerRect = textContainer.getBoundingClientRect();
        const cursorRect = cursorElement.getBoundingClientRect();
        
        // If cursor is outside visible area, scroll to make it visible
        if (cursorRect.bottom > containerRect.bottom || cursorRect.top < containerRect.top) {
          cursorElement.scrollIntoView({ block: 'center' });
        }
      }
    }
  }, [userInput, startTime, isComplete, timeLeft]);

  const handleInputChange = (e) => {
    if (isComplete || timeLeft <= 0) return;

    const value = e.target.value;
    if (value.length > sampleText.length) return;

    if (value.length > userInput.length) {
      const currentPosition = value.length - 1;
      const lastChar = value[currentPosition];
      const correspondingChar = sampleText[currentPosition];

      if (lastChar !== correspondingChar) {
        setWrongKeyPresses((prev) => [...prev, correspondingChar]);
        
        setWeakKeyStats((prev) => ({
          ...prev,
          [correspondingChar]: (prev[correspondingChar] || 0) + 1
        }));
      }
    }

    setUserInput(value);
    const spaceCount = (value.match(/ /g) || []).length;
    const newWordIndex = Math.min(spaceCount, sampleWords.length - 1);
    setCurrentWordIndex(newWordIndex);

    if (value === sampleText) {
      setIsComplete(true);
      inputRef.current.blur();
      clearInterval(timerRef.current);
      clearInterval(livePerfRef.current);
    }
  };

  const calculateAccuracy = () => {
    if (!userInput) return 100;

    let correctChars = 0;
    let totalChars = 0;

    for (let i = 0; i < userInput.length; i++) {
      totalChars++;
      if (userInput[i] === sampleText[i]) {
        correctChars++;
      }
    }

    return totalChars > 0
      ? Math.round((correctChars / totalChars) * 100)
      : 100;
  };

  const renderText = () => {
    const characters = sampleText.split('');
    
    return (
      <div className="relative leading-relaxed tracking-wide">
        {characters.map((char, index) => {
          // Determine char state: cursor, correct, incorrect, or untyped
          const isCursor = index === cursorPosition;
          const isTyped = index < userInput.length;
          const isCorrect = isTyped && userInput[index] === char;
          const isError = isTyped && userInput[index] !== char;
          
          // Assign appropriate styling based on the character's state
          let charClass = 'font-mono text-lg md:text-xl';
          
          if (isCursor) {
            charClass += ' cursor-position relative';
          }
          
          if (isTyped) {
            charClass += isCorrect ? ' text-green-600' : ' text-red-500';
          } else {
            charClass += ' text-gray-500';
          }
          
          // Apply special styling to spaces for better visibility
          if (char === ' ') {
            charClass += ' space-char';
          }
          
          return (
            <span key={index} className={charClass}>
              {char === ' ' ? '\u00A0' : char}
              {isCursor && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 animate-pulse"></span>
              )}
            </span>
          );
        })}
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

  useEffect(() => {
    if (isComplete) {
      const result = {
        userId: currentUser?._id,
        wpm,
        sampleText,
        wrongKeyPresses,
        weakKeyStats,
        accuracy: calculateAccuracy(),
        userInput,
      };
      setTypingresult(result);
      if (currentUser) {
        saveResult(result);
      }
    }
  }, [isComplete]);

  // Keyboard mapping for visual keyboard
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const getKeyClass = (key) => {
    const isWeakKey = Boolean(weakKeyStats[key]) || wrongKeyPresses.includes(key);
    
    let baseClass = "w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center uppercase font-medium border text-sm transition-all ";
    
    if (isWeakKey) {
      baseClass += "bg-red-100 border-red-300 text-red-800 ";
    } else {
      baseClass += "bg-white border-gray-200 text-gray-700 ";
    }
    
    if (showKeyboard) {
      baseClass += "transform hover:scale-105 hover:bg-purple-50 hover:border-purple-200 ";
    }
    
    return baseClass;
  };

  const renderKeyboard = () => {
    if (!showKeyboard) return null;
    
    return (
      <div className="mb-6 p-6 border border-gray-200 rounded-xl bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          {keyboardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1.5" style={{ paddingLeft: rowIndex * 12 }}>
              {row.map((key) => (
                <div 
                  key={key} 
                  className={getKeyClass(key)}
                  data-tips={weakKeyStats[key] ? `${weakKeyStats[key]} errors` : null}
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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 font-sans mt-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl text-center font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Speed Typing Test
        </h1>
        <p className="text-gray-500">Improve your typing speed and accuracy with practice</p>
      </div>

      {/* Live Stats Bar */}
      <div className="bg-white shadow-lg rounded-xl mb-6 p-4 flex justify-between items-center border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Time</div>
            <div className={`text-2xl font-bold flex items-center ${timeLeft < 10 ? "text-red-500" : "text-gray-700"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeLeft}s
            </div>
          </div>
          
          <div className="h-12 w-0.5 bg-gray-200"></div>
          
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">WPM</div>
            <div className="text-2xl font-bold text-purple-600">{startTime ? liveWpm : "-"}</div>
          </div>
          
          <div className="h-12 w-0.5 bg-gray-200"></div>
          
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Accuracy</div>
            <div className="text-2xl font-bold text-blue-500">{startTime ? liveAccuracy : "-"}%</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Progress</div>
            <div className="text-sm font-medium text-gray-700 flex items-center">
              <span className="text-purple-600 font-bold">{Math.min(currentWordIndex + 1, sampleWords.length)}</span>
              <span className="mx-1">/</span>
              <span>{sampleWords.length}</span>
              <span className="ml-1">words</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`p-1.5 rounded-lg transition-colors ${showKeyboard ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}
            title={showKeyboard ? "Hide keyboard" : "Show keyboard"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
            </svg>
          </button>
        </div>
      </div>

      {renderKeyboard()}

      <div 
        ref={textDisplayRef}
        className="mb-6 bg-white p-8 rounded-xl shadow-md border border-gray-200 max-h-[250px] overflow-y-auto relative"
      >
        {renderText()}
      </div>

      <div className="relative mb-8">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className={`w-full px-5 py-4 text-lg rounded-xl border shadow-sm focus:outline-none transition-all ${
            isComplete
              ? "border-gray-300 bg-gray-50"
              : "border-purple-300 focus:ring-4 focus:ring-purple-100 focus:border-purple-500"
          }`}
          placeholder={isComplete ? "Test completed!" : "Start typing here..."}
          disabled={isComplete || timeLeft === 0}
        />
        {!startTime && !isComplete && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium animate-pulse flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Type to start!
          </div>
        )}
        
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
          Press Tab to restart | Press Enter to complete
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={setRandomParagraph}
          className={`flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-md hover:from-purple-700 hover:to-purple-800 transform transition-all hover:-translate-y-0.5 ${
            loading && "opacity-50 pointer-events-none"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          New Text
        </button>

        <button
          onClick={setAiGeneratedtext}
          className={`flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl shadow-md hover:from-indigo-700 hover:to-blue-700 transform transition-all hover:-translate-y-0.5 ${
            loading && "opacity-50 pointer-events-none"
          }`}
        >
          {loading ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Practice
            </>
          )}
        </button>
      </div>

      {isComplete && (
        <div className="mt-6 space-y-5">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-green-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Test Completed!
              </h3>
              <button 
                onClick={setRandomParagraph}
                className="text-sm font-medium text-green-700 flex items-center hover:text-green-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm relative overflow-hidden">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Speed</div>
                <div className="text-2xl font-bold text-purple-600 flex items-baseline">
                  {wpm}
                  <span className="ml-1 text-sm text-gray-500">WPM</span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-purple-600" style={{width: `${Math.min(100, wpm)}%`}}></div>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm relative overflow-hidden">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Accuracy</div>
                <div className="text-2xl font-bold text-blue-500 flex items-baseline">
                  {calculateAccuracy()}
                  <span className="ml-1 text-sm text-gray-500">%</span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-blue-500" style={{width: `${calculateAccuracy()}%`}}></div>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm relative overflow-hidden">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Characters</div>
                <div className="text-2xl font-bold text-indigo-600 flex items-baseline">
                  {userInput.length}
                  <span className="ml-1 text-sm text-gray-500">chars</span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-indigo-600" style={{width: `${Math.min(100, userInput.length/5)}%`}}></div>
              </div>
              
              <div className="bg-white p-3 rounded-lg shadow-sm relative overflow-hidden">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Time</div>
                <div className="text-2xl font-bold text-emerald-600 flex items-baseline">
                  {60 - timeLeft}
                  <span className="ml-1 text-sm text-gray-500">sec</span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-emerald-600" style={{width: `${((60 - timeLeft) / 60) * 100}%`}}></div>
              </div>
            </div>

            {Object.keys(weakKeyStats).length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                        className="inline-flex items-center px-3 py-1.5 bg-purple-50 border border-purple-100 text-purple-700 rounded-lg text-sm"
                      >
                        <span className="font-mono mr-2 px-2 py-0.5 bg-white rounded shadow-inner border border-purple-100 text-purple-700 font-bold">{key}</span>
                        <span className="text-xs bg-purple-200 px-1.5 py-0.5 rounded-full text-purple-800 font-medium">{count}</span>
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>

          {!currentUser && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-6 shadow-sm text-center">
              <p className="text-gray-700 mb-3">Save your results and track your progress</p>
              <NavLink 
                to="/signin"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In Now
              </NavLink>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .space-char::before {
          content: "·";
          color: #d1d5db;
          position: absolute;
        }
        
        [data-tips]:hover::after {
          content: attr(data-tips);
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #4c1d95;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          white-space: nowrap;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default TypingBox;
