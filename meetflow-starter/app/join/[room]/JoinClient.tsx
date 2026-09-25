"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PreJoin } from "@livekit/components-react";

export default function JoinClient({ room }: { room: string }) {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <main className="prejoin-page">
      <div className="prejoin-top">
        <div className="brand">Meet<span>Flow</span></div>
        <span className="room-pill">Meeting: {room}</span>
      </div>

      <section className="prejoin-shell">
        <div className="prejoin-copy">
          <div className="section-label">Before you join</div>
          <h1>Check your camera and microphone.</h1>
          <p>
            Choose your devices, preview your video, and enter the meeting when you&apos;re ready.
          </p>

          <label className="field">
            <span>Your display name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              maxLength={60}
            />
          </label>

          <button
            className="primary-button full"
            disabled={!name.trim()}
            onClick={() =>
              router.push(`/meeting/${encodeURIComponent(room)}?name=${encodeURIComponent(name.trim())}`)
            }
          >
            Join meeting
          </button>
        </div>

        <div className="prejoin-video">
          <PreJoin
            defaults={{ username: name || "Guest", videoEnabled: true, audioEnabled: true }}
            onValidate={(values) => {
              if (!name.trim()) {
                setName(values.username?.trim() || "");
              }
              return !!(name.trim() || values.username?.trim());
            }}
          />
        </div>
      </section>
    </main>
  );
}
