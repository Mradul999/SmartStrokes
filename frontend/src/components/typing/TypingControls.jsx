import React, { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const TypingControls = ({
  setRandomParagraph,
  setAiGeneratedtext,
  currentUser,
  loading,
  timeLeft,
  isComplete,
  navigate,
  startTime,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
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
        {(timeLeft == 60 || timeLeft == 30 || timeLeft == 120 || isComplete) &&
          "New Text"}
      </button>
      {(!startTime || isComplete) && (
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
      )}
    </div>
  );
};

export default TypingControls;
