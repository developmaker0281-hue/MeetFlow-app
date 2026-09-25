import Link from "next/link";

function createRoomId() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const part = (n: number) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `${part(3)}-${part(4)}-${part(3)}`;
}

export default function Home() {
  const room = createRoomId();

  return (
    <main className="landing">
      <section className="hero">
        <div className="brand">Meet<span>Flow</span></div>
        <div className="badge">Real-time meetings</div>
        <h1>Meet, share, chat and collaborate — in your browser.</h1>
        <p className="hero-copy">
          A production-oriented starting point for a Zoom / Microsoft Teams style meeting product.
          Video, audio, screen sharing and in-meeting chat are powered by LiveKit WebRTC infrastructure.
        </p>

        <div className="actions">
          <Link className="primary-button" href={`/join/${room}`}>Start a new meeting</Link>
          <Link className="secondary-button" href="#features">Explore features</Link>
        </div>

        <div className="join-card">
          <div>
            <strong>Have a meeting link?</strong>
            <span>Paste the room URL into your browser.</span>
          </div>
          <span className="hint">Example: /join/abc-defg-hij</span>
        </div>
      </section>

      <section id="features" className="feature-section">
        <div className="section-label">Included now</div>
        <h2>Core meeting experience</h2>
        <div className="feature-grid">
          {[
            ["🎥", "HD video", "Multi-participant video/audio rooms with adaptive WebRTC media."],
            ["🖥️", "Screen sharing", "Present a tab, window or screen directly inside the meeting."],
            ["💬", "Live chat", "Realtime room chat with no page refresh."],
            ["🎙️", "Device controls", "Camera, microphone, device selection and leave controls."],
            ["👥", "Participant grid", "Responsive gallery layout with participant focus support."],
            ["🔒", "Server-side tokens", "LiveKit API secrets stay on the server, never in the browser."]
          ].map(([icon, title, body]) => (
            <article className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        MeetFlow starter • Built with Next.js + LiveKit
      </footer>
    </main>
  );
}
