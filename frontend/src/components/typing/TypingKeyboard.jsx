import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const TypingKeyboard = ({ showKeyboard, weakKeyStats, wrongKeyPresses }) => {
  const { theme } = useContext(ThemeContext);

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

export default TypingKeyboard;
