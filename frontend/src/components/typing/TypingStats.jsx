import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const TypingStats = ({ timeLeft, currentWordIndex, sampleWords, showKeyboard, setShowKeyboard, setTimeLeft, userSelectedtime }) => {
  const { theme } = useContext(ThemeContext);

  return (
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
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-1  ">
          <h1
            className={`text-xs uppercase tracking-wide  ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Chose Time
          </h1>
          <ul
            className={`text-sm font-medium flex  gap-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <li
              className={`cursor-default ${
                timeLeft === 30 && "text-violet-500"
              }`}
              onClick={(e) => {
                setTimeLeft(30);
              }}
            >
              30
            </li>
            <li
              className={`cursor-default ${
                timeLeft === 60 && "text-violet-500"
              }`}
              onClick={(e) => {
                setTimeLeft(60);
              }}
            >
              60
            </li>
            <li
              className={`cursor-default ${
                timeLeft === 120 && "text-violet-500"
              }`}
              onClick={(e) => {
                setTimeLeft(120);
              }}
            >
              120
            </li>
          </ul>
        </div>
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
  );
};

export default TypingStats;
