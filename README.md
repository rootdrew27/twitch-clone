# Twitch Clone

This application is a self-hosted, minimal implementation of Twitch. This is a video streaming app that serves as practice for the creation of Disco (a video streaming app that I will create in the near future).

## Getting Started

Following the [Setup LiveKit](./docs/LiveKit-Setup.md) guide to locally host the livekit-server and the LiveKit ingress service.
    - This requires Redis, and optionally Docker.

Install dependencies:
```
npm install
```

Run the development server: 
```
npm run dev
```
Open the website at http://localhost:3000

**More instructions coming soon...**

## Tech Stack

- Next.js
- Clerk : handles Auth (will be replaced by self hosted solution).
- MySQL : Handles users, stream info, following, and blocking status.
- Redis : required for LiveKit's ingress service.
- Docker : currently for running LiveKit's ingress service.
- LiveKit : for dissemination of streams, and stream participant management.
- AWS S3 : for stream thumbnails.
- MongoDB : for persistent chats.

- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).