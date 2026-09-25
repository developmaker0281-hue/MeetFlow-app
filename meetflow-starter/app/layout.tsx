import "@livekit/components-styles";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MeetFlow — Video meetings",
  description: "A Zoom/Teams-style meeting application built with Next.js and LiveKit."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
