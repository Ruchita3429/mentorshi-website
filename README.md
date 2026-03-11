# Mentorship Platform

Full‑stack mentorship management app with:

- **Frontend**: Next.js (App Router, TypeScript, Tailwind)
- **Backend**: Node.js, Express, MongoDB (Atlas)
- **LLM**: Google Gemini API for text summarization

The app supports signup/login, a dashboard, managing students and lessons, and a page to summarize notes using Gemini.

---

## 1. Project structure

```text
mentorship-platform/
  app/                 # Next.js app routes
    dashboard/
    login/
    signup/
    student/
    lesson/
    summarize/
  components/          # Shared UI components (Navbar, FormInput, etc.)
  lib/
    api.js             # Frontend API client for the backend
  backend/             # Express API server
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    index.js           # Backend entrypoint
```

Frontend and backend live in the same repo, but are deployed separately:

- Frontend → **Vercel**
- Backend → **Render** (Node/Express service)

---

## 2. Environment variables

### 2.1 Frontend (`.env.local`)

Create `mentorship-platform/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://mentorship-website-m5my.onrender.com
```

Locally you can also point this at your local backend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Vercel: set the same `NEXT_PUBLIC_API_BASE_URL` value in **Project Settings → Environment Variables**.

### 2.2 Backend (`backend/.env`)

Create `mentorship-platform/backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any long random string>
JWT_EXPIRE=7d

GEMINI_API_KEY=<your Gemini API key>
GEMINI_API_VERSION=v1beta
GEMINI_MODEL=gemini-3.1-flash-lite-preview
```

Render: configure the same keys in the Render dashboard for the backend service.

---

## 3. Running locally

### 3.1 Install dependencies

From the `mentorship-platform` root:

```bash
cd mentorship-platform
npm install              # frontend deps

cd backend
npm install              # backend deps
```

### 3.2 Start backend (Express)

From `mentorship-platform/backend`:

```bash
node index.js
```

You should see:

```text
MongoDB Connected: ...
Server running on port 5000
```

Backend runs at `http://localhost:5000`.

### 3.3 Start frontend (Next.js)

From `mentorship-platform`:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000` (or `3001` if 3000 is busy).

Login/signup, dashboard, students, lessons, and summarize pages will now work against the local backend as long as `NEXT_PUBLIC_API_BASE_URL` points to `http://localhost:5000`.

---

## 4. API overview

Base URL (configurable via `NEXT_PUBLIC_API_BASE_URL`):

- **Auth**
  - `POST /api/auth/signup` – create user (parent/mentor)
  - `POST /api/auth/login` – authenticate, returns JWT
  - `GET /api/auth/me` – get current user (requires JWT)
- **Students**
  - `POST /api/students` – create student (role: parent)
  - `GET /api/students` – list students
- **Lessons**
  - `POST /api/lessons` – create lesson (role: mentor)
  - `GET /api/lessons` – list lessons
- **LLM**
  - `POST /api/llm/summarize` – summarize long text using Gemini

Auth uses a **Bearer JWT** in the `Authorization` header. `lib/api.js` automatically attaches the token from `localStorage`.

---

## 5. Deployment

- **Backend (Render)**
  - Build command: `npm install` (in `backend`)
  - Start command: `node index.js`
  - Environment: set all keys from `backend/.env`
- **Frontend (Vercel)**
  - Framework: Next.js (App Router)
  - Env: `NEXT_PUBLIC_API_BASE_URL` pointing at the Render backend URL


## 6. Gemini summarization

The backend utility at `backend/utils/summarize.js` calls the Gemini **generateContent** REST API using:

- API version from `GEMINI_API_VERSION`
- Model from `GEMINI_MODEL`

To update the model:

1. Copy the model ID and version from Google AI Studio’s sample request.
2. Set `GEMINI_MODEL` and `GEMINI_API_VERSION` in `backend/.env` to match.

The frontend `Summarize` page posts text to `/api/llm/summarize` via `lib/api.js` and displays the bullets returned by Gemini.

---

## 7. Useful scripts

From the project root (`mentorship-platform`):

- `npm run dev` – run Next.js dev server
- `npm run build` – build frontend for production
- `npm run start` – start built frontend (on Vercel this is handled automatically)

From `backend`:

- `node index.js` – start Express API in development/production

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



