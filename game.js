
import { useEffect, useState, useRef } from 'react';

export default function Game() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [playerX, setPlayerX] = useState(1);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/[\r\n]+/).filter(line => line.length > 10);
    const generated = lines.slice(0, 5).map((line, i) => ({
      question: `Q${i + 1}: What does this line say?`,
      options: [line.slice(0, 20), line.slice(20, 40), line.slice(40, 60)].filter(Boolean),
      answer: line.slice(0, 20)
    }));
    setQuestions(generated);
    setFileUploaded(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPlayerX((prev) => Math.max(0, prev - 1));
    if (e.key === 'ArrowRight') setPlayerX((prev) => Math.min(2, prev + 1));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCollision = (lane) => {
    const correct = questions[questionIndex].answer;
    const correctLane = questions[questionIndex].options.findIndex(opt => opt === correct);
    if (lane === correctLane) {
      if (questionIndex + 1 === questions.length) {
        setWin(true);
      } else {
        setQuestionIndex(prev => prev + 1);
        setPlayerX(1);
      }
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setWin(false);
    setQuestionIndex(0);
    setFileUploaded(false);
    setQuestions([]);
    setPlayerX(1);
  };

  const current = questions[questionIndex];
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20, textAlign: 'center' }}>
      <h1>🛣️ RaphRoadRunner</h1>

      {!fileUploaded && (
        <>
          <p>Upload a document to begin the game:</p>
          <input type="file" accept=".txt,.doc,.docx,.pdf" onChange={handleFileUpload} />
        </>
      )}

      {gameOver && (
        <div>
          <h2>💥 Peter exploded! Try again.</h2>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}

      {win && (
        <div>
          <h2>✅ You did it!</h2>
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}

      {!gameOver && !win && fileUploaded && current && (
        <>
          <h2>{current.question}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
            {current.options.map((opt, i) => (
              <div
                key={i}
                onClick={() => handleCollision(i)}
                style={{
                  width: 150,
                  height: 80,
                  background: '#eee',
                  border: '2px solid #444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {opt}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            {[0, 1, 2].map((lane) => (
              <div
                key={lane}
                style={{ width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {playerX === lane && (
                  <img
                    src="https://media.tenor.com/Vtf1XjJLna4AAAAC/peter-griffin-run.gif"
                    alt="Peter Griffin"
                    style={{ width: 100 }}
                    onClick={() => handleCollision(lane)}
                  />
                )}
              </div>
            ))}
          </div>
          <p>← → Move Peter. Click Peter to submit.</p>
        </>
      )}
    </div>
  );
}
