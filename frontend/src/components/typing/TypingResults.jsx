import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const TypingResults = ({
  isComplete,
  resultsRef,
  setRandomParagraph,
  calculateSkillLevel,
  getSkillLevelColor,
  wpm,
  calculateAccuracy,
  userInput,
  weakKeyStats,
  currentUser,
  timeLeft
}) => {
  const { theme } = useContext(ThemeContext);

  if (!isComplete) return null;

  return (
    <div ref={resultsRef} className="mt-6 space-y-5">
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
  );
};

export default TypingResults;
