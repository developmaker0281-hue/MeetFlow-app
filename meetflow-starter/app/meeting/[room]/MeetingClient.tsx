"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from "@livekit/components-react";

type TokenResponse = {
  serverUrl: string;
  participantToken: string;
};

export default function MeetingClient({
  room,
  name
}: {
  room: string;
  name: string;
}) {
  const [tokenData, setTokenData] = useState<TokenResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function getToken() {
      try {
        const response = await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            room_name: room,
            participant_name: name
          })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not create meeting token.");

        if (!cancelled) setTokenData(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not connect to meeting.");
        }
      }
    }

    getToken();
    return () => {
      cancelled = true;
    };
  }, [room, name]);

  if (error) {
    return (
      <main className="center-page">
        <div className="error-card">
          <div className="brand">Meet<span>Flow</span></div>
          <h1>Unable to join</h1>
          <p>{error}</p>
          <p className="muted">
            Check your LiveKit environment variables and make sure your LiveKit project is running.
          </p>
          <a className="secondary-button" href={`/join/${encodeURIComponent(room)}`}>
            Back to pre-join
          </a>
        </div>
      </main>
    );
  }

  if (!tokenData) {
    return (
      <main className="center-page">
        <div className="loading">
          <div className="spinner" />
          <p>Connecting to your meeting…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="meeting-page">
      <LiveKitRoom
        token={tokenData.participantToken}
        serverUrl={tokenData.serverUrl}
        connect
        audio
        video
        data-lk-theme="default"
        className="meeting-room"
      >
        <div className="meeting-header">
          <div className="brand small">Meet<span>Flow</span></div>
          <div className="meeting-title">
            <strong>{room}</strong>
            <span>Live meeting</span>
          </div>
          <button
            className="copy-button"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            🔗 Copy invite
          </button>
        </div>

        <div className="meeting-content">
          <VideoConference />
        </div>

        <RoomAudioRenderer />
      </LiveKitRoom>
    </main>
  );
}
