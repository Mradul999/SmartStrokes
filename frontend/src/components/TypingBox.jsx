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
  const [timeLeft, setTimeLeft] = useState(10);

  const [wpm, setWpm] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongKeyPresses, setWrongKeyPresses] = useState([]);
  // console.log("wrong key press =>", wrongKeyPresses);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => {
    setRandomParagraph();
  }, []);

  const [sampleText, setSampleText] = useState("");
  // console.log(sampleText);
  const [sampleWords, setSampleWords] = useState([]);
  // console.log(sampleWords);

  const [loading, SetLoading] = useState(false);

  const currentUser = auhtStore((state) => state.currentUser);

  const setTypingresult = TypingresultStore((state) => state.setTypingresult);

  const reset = () => {
    setUserInput("");
    setStartTime(null);
    setTimeLeft(10);
    setWpm(0);
    setCurrentWordIndex(0);
    setIsComplete(false);
    setWrongKeyPresses([]);
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
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (startTime && !isComplete && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsComplete(true);
            // Make sure to calculate final results when time runs out

            inputRef.current.blur();
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

    // Only calculate WPM when the test is complete
    if (isComplete || timeLeft === 0) {
      const timeElapsed =
        (startTime ? Date.now() - startTime : 0) / 60000 || 0.001; // Avoid division by zero
      const wordsTyped = userInput.trim().split(/\s+/).length;
      setWpm(Math.floor(wordsTyped / timeElapsed));
    }
  }, [userInput, startTime, isComplete, timeLeft]);

  const handleInputChange = (e) => {
    if (isComplete || timeLeft <= 0) return;

    const value = e.target.value;
    if (value.length > sampleText.length) return;

    // Check for mistakes
    if (value.length > userInput.length) {
      const currentPosition = value.length - 1;
      const lastChar = value[currentPosition];
      const correspondingChar = sampleText[currentPosition];

      if (lastChar !== correspondingChar) {
        console.log(
          `Wrong key press: expected '${correspondingChar}', got '${lastChar}'`
        );
        setWrongKeyPresses((prev) => [...prev, correspondingChar]);
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
    }
  };

  const calculateAccuracy = () => {
    if (!userInput) return 0;

    let correctChars = 0;
    let totalChars = 0;

    // Compare each character the user has typed with the sample text
    for (let i = 0; i < userInput.length; i++) {
      totalChars++;
      if (userInput[i] === sampleText[i]) {
        correctChars++;
      }
    }

    console.log("Correct chars:", correctChars, "Total chars:", totalChars);
    return totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
  };

  const renderText = () => {
    const userWords = userInput.split(" ");

    return (
      <div className="flex flex-wrap leading-relaxed break-words">
        {sampleWords.map((word, wordIndex) => {
          const isCurrentWord = wordIndex === currentWordIndex && !isComplete;
          const userWord = userWords[wordIndex] || "";
          const isPastWord = wordIndex < currentWordIndex;

          return (
            <div
              key={wordIndex}
              className={`mr-2 mb-1 rounded ${
                isCurrentWord ? "bg-purple-100 px-1 py-0.5" : ""
              }`}
            >
              {word.split("").map((char, charIndex) => {
                let textColor = "text-gray-500";
                let fontWeight = "font-normal";

                if (isPastWord || isComplete) {
                  const userChar = userWord[charIndex];
                  if (userChar !== undefined) {
                    textColor =
                      char === userChar ? "text-green-600" : "text-red-600";
                  }
                } else if (isCurrentWord && charIndex < userWord.length) {
                  textColor =
                    char === userWord[charIndex]
                      ? "text-green-600"
                      : "text-red-600";
                  fontWeight =
                    charIndex === userWord.length - 1
                      ? "font-bold"
                      : "font-normal";
                }

                return (
                  <span
                    key={charIndex}
                    className={`relative ${textColor} ${fontWeight}`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  const setAiGeneratedtext = async () => {
    try {
      SetLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/text/gettext`,
        { misTypes: wrongKeyPresses },
        { withCredentials: true }
      );

      if (response.status === 200) {
        SetLoading(false);
        console.log(response.data);
        setSampleText(response.data.message);

        setSampleWords(response.data.message.split(" "));
        reset();
      }
    } catch (error) {
      SetLoading(false);
      console.log(error);
      alert("failed to generate ai text");
    }
  };
  // const saveResult = async (result) => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/result/saveresult`,
  //       result,
  //       { withCredentials: true }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (isComplete) {
    const result = {
      userId: currentUser?._id,
      wpm,
      sampleText,
      wrongKeyPresses,
      accuracy: calculateAccuracy(),
      userInput,
    };
    console.log(result);
    setTypingresult(result);
    if (currentUser) {
      saveResult(result);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-3xl text-center text-purple-700 font-bold mb-6">
        Typing Test
      </h1>

      <div className="text-lg mb-6 bg-purple-50 p-5 rounded-lg shadow-sm border border-purple-300 max-h-[300px] overflow-y-auto">
        <div className="text-justify break-words leading-relaxed max-w-full">
          {renderText()}
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 text-base mb-4 rounded-md border 
          ${
            isComplete
              ? "border-gray-300 bg-gray-100"
              : "border-purple-300 focus:ring-2 focus:ring-purple-400"
          } 
          transition-all shadow-sm outline-none`}
        placeholder={isComplete ? "Test completed!" : "Start typing here..."}
        disabled={isComplete || timeLeft === 0}
      />

      <div className="flex justify-between items-center bg-purple-50 px-4 py-3 rounded-md border border-purple-200 mb-5">
        <div className="font-medium text-purple-700">
          Progress: {Math.min(currentWordIndex + 1, sampleWords.length)}/
          {sampleWords.length}
        </div>
        <div className="font-medium text-red-500">⏱ {timeLeft}s</div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={setRandomParagraph}
          className={`bg-purple-600 text-white px-6 py-2 rounded-md shadow hover:bg-purple-700 transition-all ${
            loading && "pointer-events-none"
          }`}
        >
          Normal Practice
        </button>

        <button
          onClick={setAiGeneratedtext}
          className={`bg-purple-600 ${
            loading && "pointer-events-none "
          } text-white px-6 py-2 rounded-md shadow w-[140px] flex items-center justify-center hover:bg-purple-700 transition-all`}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "AI Practice"}
        </button>
      </div>

      {isComplete && (
        <div className="mt-6 space-y-3 flex flex-col   items-center">
          <div className="p-3 bg-green-100 text-green-800 rounded-md w-full">
            🎉 Test completed! Speed: <strong>{wpm}</strong> WPM | Accuracy:{" "}
            <strong>{calculateAccuracy()}%</strong>
          </div>
          <div>
            {!currentUser && (
              <span className="font-medium text-lg">
                {" "}
                <NavLink to="/signin">
                  <span className="font-bold  text-purple-400">Signin </span>
                </NavLink>
                to save your results
              </span>
            )}
          </div>
          {/* <div className="p-3 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Mistake Analysis:</h3>
            {Object.entries(wrongKeyPresses).length > 0 ? (
              <ul className="space-y-1">
                {Object.entries(wrongKeyPresses).map(([char, count]) => (
                  <li key={char}>
                    Wrong key instead of '
                    <span className="font-bold">{char}</span>': {count} time
                    {count > 1 ? "s" : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No mistakes — Perfect typing! 🎯</p>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default TypingBox;
