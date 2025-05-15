
import { useState } from 'react';

const voices = {
  homer: "D'oh! Let's break it down...",
  peter: "Okay, here’s what that means...",
  rick: "Morty, it's like science... just dumber.",
};

export default function Home() {
  const [char, setChar] = useState("homer");

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>
      <h1>🛣️ RaphRoadRunner</h1>
      <p>Select a character to hear their style:</p>
      <div style={{ margin: '1rem' }}>
        {Object.keys(voices).map((c) => (
          <button key={c} onClick={() => setChar(c)} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
        <strong>{char.toUpperCase()} says:</strong>
        <p>{voices[char]}</p>
      </div>
    </div>
  );
}
