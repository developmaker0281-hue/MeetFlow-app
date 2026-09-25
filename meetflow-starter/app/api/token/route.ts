import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const roomName = String(body.room_name || "").trim();
    const participantName = String(body.participant_name || "").trim();

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: "room_name and participant_name are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const serverUrl = process.env.LIVEKIT_URL;

    if (!apiKey || !apiSecret || !serverUrl) {
      return NextResponse.json(
        {
          error:
            "LiveKit is not configured. Add LIVEKIT_API_KEY, LIVEKIT_API_SECRET and LIVEKIT_URL to .env.local."
        },
        { status: 500 }
      );
    }

    // Do not expose API secrets to the browser.
    // Use an opaque identity rather than putting personal data into LiveKit identity fields.
    const identity = crypto.randomUUID();

    const token = new AccessToken(apiKey, apiSecret, {
      identity,
      name: participantName.slice(0, 60),
      ttl: "2h"
    });

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true
    });

    return NextResponse.json({
      serverUrl,
      participantToken: await token.toJwt()
    });
  } catch {
    return NextResponse.json({ error: "Invalid token request." }, { status: 400 });
  }
}
