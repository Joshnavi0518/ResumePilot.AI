# ResumePilot.AI

Full-stack workspace for generating ATS-ready resumes, tailored cover letters, and ATS score insights with gated access (MongoDB auth + JWT sessions).

## Features

- Protected React workspace powered by React Router + Context API
- MongoDB authentication with hashed passwords + JWT sessions
- Direct handoff into the ResumePilot.AI dashboard (role prompt, resume input, ATS score/resume/cover letter generation)
- Dedicated `/editor` workspace for template tweaks, personal details, and PDF export
- Health check endpoint and structured API client for future expansion

## Tech Stack

- **Frontend**: React 19, Vite, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT

## Quick Start

### 1. Frontend

```bash
cd demo
npm install
npm run dev
```

The client expects `VITE_API_URL` (defaults to `http://localhost:5000/api` if omitted).

### 2. Backend

```bash
cd demo/server
npm install
npm run dev
```

Create a `.env` file inside `demo/server` (file creation is blocked in the repo, so you must add it manually) with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/AI-Resume_Builder
JWT_SECRET=change_me
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
```

### 3. Auth flow

1. Sign up on `/login` (register tab).
2. Credentials are securely stored (hashed passwords in MongoDB).
3. Sign in to access the ResumePilot.AI dashboard.

## Folder Overview

- `src/pages/Login.jsx`: Auth landing page (register + login)
- `src/context/AuthContext.jsx`: Auth state, persistence, API hooks
- `src/components/ProtectedRoute.jsx`: Guards the resume builder
- `src/pages/Home.jsx`: Existing builder experience (ATS score, resume & cover letter generation)
- `server/`: Express API + MongoDB models

## Scripts

- `npm run dev` (client) – Vite dev server
- `npm run build` (client) – production build
- `npm run dev` (server) – nodemon-powered API server
- `npm run start` (server) – production API server

## Next Steps

- Plug in your Gemini/OpenAI keys inside `src/services/geminiApi.js` if needed
- Deploy the server (Render/Fly/Heroku) and point `VITE_API_URL` to the hosted API

Happy building! 🎯
