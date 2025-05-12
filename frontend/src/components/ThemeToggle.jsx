import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = ({ className = "", size = "md", showLabel = false }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // Determine size class
  const sizeClass = {
    sm: "w-10 h-5",
    md: "w-12 h-6",
    lg: "w-14 h-7"
  }[size] || "w-12 h-6";
  
  // Determine circle size based on toggle size
  const circleSize = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }[size] || "w-5 h-5";
  
  // Determine transform class for circle position
  const translateX = {
    sm: "translate-x-5",
    md: "translate-x-6",
    lg: "translate-x-7"
  }[size] || "translate-x-6";
  
  return (
    <div className={`flex items-center ${className}`}>
      {showLabel && (
        <span className={`mr-2 text-sm font-medium ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          {theme === "dark" ? "Dark" : "Light"}
        </span>
      )}
      
      <button
        onClick={toggleTheme}
        className={`${sizeClass} flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
          theme === "dark"
            ? "bg-purple-600 border border-purple-800"
            : "bg-gray-200 border border-gray-300"
        }`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        role="switch"
        aria-checked={theme === "dark"}
      >
        <div
          className={`${circleSize} transform transition-transform duration-300 rounded-full shadow-md flex items-center justify-center ${
            theme === "dark"
              ? `${translateX} bg-gray-900`
              : "translate-x-0 bg-white"
          }`}
        >
          {theme === "dark" ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 text-yellow-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 text-yellow-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle; 