import React, { useState, useEffect, useRef } from 'react';

const TypingBox = () => {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongKeyPresses, setWrongKeyPresses] = useState({});
  const inputRef = useRef(null);
  
  const sampleText = "It might be surprising to know that our fingers do not contain any muscles. Instead, all movements are controlled by muscles in the forearm.";
  const sampleWords = sampleText.split(' ');

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
    
    if (userInput.length > 0 && startTime) {
      const timeElapsed = (Date.now() - startTime) / 60000;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      setWpm(Math.floor(wordsTyped / timeElapsed));
    }
  }, [userInput, startTime]);

  const handleInputChange = (e) => {
    if (isComplete) return;
    
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const currentPosition = value.length - 1;
    const correspondingChar = sampleText[currentPosition];

    // Track wrong key presses
    if (value.length > userInput.length && lastChar && correspondingChar && lastChar !== correspondingChar) {
      setWrongKeyPresses(prev => {
        const newWrongPresses = { ...prev };
        newWrongPresses[correspondingChar] = (newWrongPresses[correspondingChar] || 0) + 1;
        return newWrongPresses;
      });
    }

    setUserInput(value);

    // Calculate current word index based on actual spaces
    const spaceCount = (value.match(/ /g) || []).length;
    const newWordIndex = Math.min(spaceCount, sampleWords.length - 1);
    setCurrentWordIndex(newWordIndex);

    // Check if all words are completed
    if (newWordIndex >= sampleWords.length - 1) {
      const userWords = value.split(' ');
      const lastUserWord = userWords[userWords.length - 1] || '';
      const lastSampleWord = sampleWords[sampleWords.length - 1];
      
      if (lastUserWord.length >= lastSampleWord.length) {
        setIsComplete(true);
        inputRef.current.blur();
        console.log('Wrong key presses:', wrongKeyPresses);
      }
    }
  };

  const renderText = () => {
    const userWords = userInput.split(' ');
    
    return (
      <div className="flex flex-wrap leading-relaxed">
        {sampleWords.map((word, wordIndex) => {
          const isCurrentWord = wordIndex === currentWordIndex && !isComplete;
          const userWord = userWords[wordIndex] || '';
          const isPastWord = wordIndex < currentWordIndex;
          
          return (
            <div 
              key={wordIndex} 
              className={`
                mr-2 mb-1 rounded
                ${isCurrentWord ? 'bg-gray-100 px-1 py-0.5' : ''}
              `}
            >
              {word.split('').map((char, charIndex) => {
                let textColor = 'text-gray-500'; // default
                let fontWeight = 'font-normal';
                
                if (isPastWord || isComplete) {
                  // For past words, check each character
                  const userChar = userWord[charIndex];
                  if (userChar !== undefined) {
                    textColor = char === userChar ? 'text-green-600' : 'text-red-600';
                  } else {
                    textColor = 'text-gray-500';
                  }
                } else if (isCurrentWord && charIndex < userWord.length) {
                  // Current word in progress
                  textColor = char === userWord[charIndex] ? 'text-green-600' : 'text-red-600';
                  fontWeight = charIndex === userWord.length - 1 ? 'font-bold' : 'font-normal';
                }
                
                return (
                  <span 
                    key={charIndex} 
                    className={`relative ${textColor} ${fontWeight}`}
                  >
                    {char}
                    {isCurrentWord && charIndex === userWord.length && (
                      <span className="absolute left-0 w-full h-0.5 bottom-0 bg-blue-500"></span>
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
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
    return totalTypedChars > 0 ? Math.floor((correctChars / totalTypedChars) * 100) : 0;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl text-gray-800 text-center mb-6 font-semibold">
        Typing Test
      </h1>
      
      <div className="text-lg mb-6 min-h-[160px] bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
        {renderText()}
        {isComplete && (
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-green-100 text-green-800 rounded-md">
              Test completed! Your final speed: {wpm} WPM with {calculateAccuracy()}% accuracy
            </div>
            <div className="p-3 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">Mistake Analysis:</h3>
              {Object.entries(wrongKeyPresses).length > 0 ? (
                <ul className="space-y-1">
                  {Object.entries(wrongKeyPresses).map(([char, count]) => (
                    <li key={char}>
                      Wrong key pressed instead of '<span className="font-bold">{char}</span>': {count} time{count > 1 ? 's' : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No wrong key presses! Perfect!</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 text-base mb-4 rounded-md border ${isComplete ? 'border-gray-300 bg-gray-100' : 'border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'} transition-all`}
        placeholder={isComplete ? "Test completed!" : "Start typing here..."}
        disabled={isComplete}
      />
      
      <div className="flex justify-between bg-gray-50 px-4 py-3 rounded-md border border-gray-200">
        <div className="font-medium">
          <span className="text-gray-500">Progress: </span>
          <span className="text-gray-700">
            {Math.min(currentWordIndex + 1, sampleWords.length)}/{sampleWords.length} words
          </span>
        </div>
        <div className="font-medium">
          <span className="text-gray-500">Speed: </span>
          <span className="text-blue-600">{wpm} WPM</span>
        </div>
        <div className="font-medium">
          <span className="text-gray-500">Accuracy: </span>
          <span className={calculateAccuracy() > 80 ? 'text-green-600' : 'text-red-600'}>
            {calculateAccuracy()}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingBox;