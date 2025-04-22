import React, { useState, useEffect, useRef } from 'react';

const TypingBox = () => {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongKeyPresses, setWrongKeyPresses] = useState({});
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const sampleText =
    "Many people underestimate the importance of developing good typing habits early on. In a world where digital communication dominates nearly every aspect of daily life, typing efficiently and accurately is more than just a convenience—it’s a critical skill. Whether you're a student completing assignments, a professional drafting emails, or someone chatting with friends, your ability to type quickly and clearly affects your productivity and communication. Learning to type without constantly looking at the keyboard, also known as touch typing, can dramatically increase your speed over time.";
  const sampleWords = sampleText.split(' ');

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

    if (userInput.length > 0 && startTime && !isComplete) {
      const timeElapsed = (Date.now() - startTime) / 60000;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      setWpm(Math.floor(wordsTyped / timeElapsed));
    }
  }, [userInput, startTime, isComplete]);

  const handleInputChange = (e) => {
    if (isComplete || timeLeft <= 0) return;

    const value = e.target.value;
    if (value.length > sampleText.length) return;

    const currentPosition = value.length - 1;
    const lastChar = value[currentPosition];
    const correspondingChar = sampleText[currentPosition];

    if (value.length > userInput.length && lastChar !== correspondingChar) {
      setWrongKeyPresses((prev) => ({
        ...prev,
        [correspondingChar]: (prev[correspondingChar] || 0) + 1,
      }));
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
    const userWords = userInput.split(' ');

    sampleWords.forEach((word, wordIndex) => {
      const userWord = userWords[wordIndex] || '';
      word.split('').forEach((char, charIndex) => {
        if (charIndex < userWord.length && char === userWord[charIndex]) {
          correctChars++;
        }
      });
    });

    const totalTypedChars = userInput.replace(/\s+/g, '').length;
    return totalTypedChars > 0
      ? Math.floor((correctChars / totalTypedChars) * 100)
      : 0;
  };

  const renderText = () => {
    const userWords = userInput.split(' ');

    return (
      <div className="flex flex-wrap leading-relaxed break-words">
        {sampleWords.map((word, wordIndex) => {
          const isCurrentWord = wordIndex === currentWordIndex && !isComplete;
          const userWord = userWords[wordIndex] || '';
          const isPastWord = wordIndex < currentWordIndex;

          return (
            <div
              key={wordIndex}
              className={`mr-2 mb-1 rounded ${
                isCurrentWord ? 'bg-purple-100 px-1 py-0.5' : ''
              }`}
            >
              {word.split('').map((char, charIndex) => {
                let textColor = 'text-gray-500';
                let fontWeight = 'font-normal';

                if (isPastWord || isComplete) {
                  const userChar = userWord[charIndex];
                  if (userChar !== undefined) {
                    textColor =
                      char === userChar ? 'text-green-600' : 'text-red-600';
                  }
                } else if (isCurrentWord && charIndex < userWord.length) {
                  textColor =
                    char === userWord[charIndex]
                      ? 'text-green-600'
                      : 'text-red-600';
                  fontWeight =
                    charIndex === userWord.length - 1
                      ? 'font-bold'
                      : 'font-normal';
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
              ? 'border-gray-300 bg-gray-100'
              : 'border-purple-300 focus:ring-2 focus:ring-purple-400'
          } 
          transition-all shadow-sm outline-none`}
        placeholder={isComplete ? 'Test completed!' : 'Start typing here...'}
        disabled={isComplete || timeLeft === 0}
      />

      <div className="flex justify-between items-center bg-purple-50 px-4 py-3 rounded-md border border-purple-200 mb-5">
        <div className="font-medium text-purple-700">
          Progress: {Math.min(currentWordIndex + 1, sampleWords.length)}/
          {sampleWords.length}
        </div>
        <div className="font-medium text-purple-700">WPM: {wpm}</div>
        <div className="font-medium text-purple-700">
          Accuracy: {calculateAccuracy()}%
        </div>
        <div className="font-medium text-red-500">⏱ {timeLeft}s</div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-md shadow hover:bg-purple-700 transition-all">
          Normal Practice
        </button>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-md shadow hover:bg-purple-700 transition-all">
          AI Practice
        </button>
      </div>

      {isComplete && (
        <div className="mt-6 space-y-3">
          <div className="p-3 bg-green-100 text-green-800 rounded-md">
            🎉 Test completed! Speed: <strong>{wpm}</strong> WPM | Accuracy:{' '}
            <strong>{calculateAccuracy()}%</strong>
          </div>
          <div className="p-3 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Mistake Analysis:</h3>
            {Object.entries(wrongKeyPresses).length > 0 ? (
              <ul className="space-y-1">
                {Object.entries(wrongKeyPresses).map(([char, count]) => (
                  <li key={char}>
                    Wrong key instead of '
                    <span className="font-bold">{char}</span>': {count}{' '}
                    time{count > 1 ? 's' : ''}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No mistakes — Perfect typing! 🎯</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingBox;
