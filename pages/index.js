export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🛣️ Welcome to RaphRoadRunner</h1>
      <a href="/game">
        <button style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
          ▶️ Play the Game
        </button>
      </a>
    </div>
  );
}
