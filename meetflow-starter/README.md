# MeetFlow

A real-time browser meeting application starter inspired by the core experience of Zoom / Microsoft Teams.

## What works in this version

- Create a unique meeting URL
- Join with a display name
- Camera + microphone preview
- Multi-participant real-time video/audio
- Screen sharing
- Participant gallery / focus layouts
- In-meeting realtime chat
- Device controls
- Copyable meeting invite URL
- Server-side LiveKit access-token generation
- Responsive UI
- LiveKit WebRTC infrastructure for NAT traversal, media routing and room management

The actual media layer is not a toy WebSocket implementation. LiveKit provides the WebRTC room infrastructure; the application only mints short-lived room tokens on the server.

## Quick start

### 1. Requirements

- Node.js 20+
- A LiveKit Cloud project, or a self-hosted LiveKit server
- A browser with WebRTC support

### 2. Install

```bash
npm install
```

### 3. Configure LiveKit

Copy `.env.example` to `.env.local` and set:

```env
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
LIVEKIT_URL=wss://YOUR_PROJECT.livekit.cloud
```

Never expose `LIVEKIT_API_SECRET` to client-side code.

### 4. Run

```bash
npm run dev
```

Open:

http://localhost:3000

Create a meeting, then open the generated URL in a second browser/device to test a real multi-user call.

## Production architecture

For a serious public deployment, keep the web application separate from media infrastructure:

Browser
  |
  v
Next.js application
  |-- authentication
  |-- meeting database
  |-- permissions / roles
  |-- token endpoint
  |-- chat persistence
  |-- scheduling
  |
  +----> PostgreSQL
  |
  +----> Redis (optional for distributed jobs/presence)
  |
  +----> Object storage (recordings/files)
  |
  +----> LiveKit Cloud / self-hosted LiveKit
              |
              +----> WebRTC media

## Features to add for a full Zoom/Teams-class product

### Account & organization
- Email/password authentication
- Google/Microsoft/Apple SSO
- Organizations / workspaces
- Teams and departments
- User profiles
- Avatars
- Role-based permissions
- Admin console
- Audit logs

### Meetings
- Scheduled meetings
- Calendar integration
- Recurring meetings
- Meeting templates
- Waiting room
- Host/co-host
- Lobby approval
- Passcodes
- Locked meetings
- Participant admit/remove
- Mute-all
- Disable participant camera
- Participant permissions
- Breakout rooms
- Polls
- Q&A
- Reactions
- Raise hand
- Meeting notes
- Shared agenda
- Whiteboard

### Communication
- Persistent meeting chat
- Direct messages
- Team channels
- Threaded messages
- Mentions
- File sharing
- Search
- Notifications
- Unread counters

### Recording
- Cloud recording
- Local recording
- Recording consent indicator
- Recording management
- Transcripts
- Captions
- Searchable transcripts
- Storage lifecycle rules

### Enterprise
- SAML / OIDC SSO
- SCIM provisioning
- Domain restrictions
- Retention policies
- Legal hold
- Compliance/audit exports
- Encryption/key management
- Rate limiting
- Abuse prevention
- DDoS/WAF
- Observability
- Backup/disaster recovery

### AI
- Live transcription
- Meeting summary
- Action items
- Speaker identification
- Search across meeting history
- AI meeting assistant
- Ask questions about the meeting
- Automatic follow-up task extraction

## Important production security work

The demo token endpoint intentionally allows anonymous joining so the project is easy to test. Before public deployment, put authentication and authorization in front of `/api/token`, validate meeting membership, generate opaque participant identities, enforce host/co-host permissions, add rate limits, and add abuse controls.

LiveKit's documentation also recommends keeping API secrets on the server and using an authenticated token endpoint for production.

## Suggested next build

The next stage should add:

1. PostgreSQL + Prisma
2. User authentication
3. Meeting records and permanent invite links
4. Host/co-host permissions
5. Waiting room
6. Persistent chat
7. Scheduled meetings + calendar
8. Recording pipeline
9. Breakout rooms
10. Admin dashboard
11. Notifications
12. Production deployment configuration

This starter intentionally separates the media layer from the business-data layer so those features can be added without replacing the WebRTC foundation.
