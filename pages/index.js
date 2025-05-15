export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🛣️ RaphRoadRunner</h1>
      <p>Upload your file and test your knowledge!</p>
      <a href="/game">
        <button style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          ▶️ Play the Game
        </button>
      </a>
    </div>
  );
}
