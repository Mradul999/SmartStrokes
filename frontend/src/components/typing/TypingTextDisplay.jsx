import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const TypingTextDisplay = ({
  sampleText,
  userInput,
  cursorPosition,
  visibleLineStart,
  linesPerView,
}) => {
  const { theme } = useContext(ThemeContext);

  const words = sampleText.split(" ");

  const lines = [];
  for (let i = 0; i < words.length; i += 10) {
    lines.push(words.slice(i, i + 10));
  }

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
              const previousLines = lines.slice(0, actualLineIndex).flat();
              const wordsBeforeInText = [
                ...previousLines,
                ...line.slice(0, wordIndex),
              ];
              const charsBeforeWord =
                wordsBeforeInText.join(" ").length +
                (wordsBeforeInText.length > 0 ? 1 : 0);

              const wordStart = charsBeforeWord;
              const wordEnd = wordStart + word.length;

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

export default TypingTextDisplay;
