# Chadi-Bateh

A full-stack AI chatbot web application with a premium ChatGPT-like experience.

## Stack

- Frontend: HTML, TailwindCSS, Vanilla JavaScript
- Backend: Node.js + Express (MVC structure)
- Database: MongoDB + Mongoose
- HTTP client (frontend): Axios
- AI: OpenAI Chat Completions + OpenAI Image API

## Features

- Real-time streaming AI responses with typing effect
- Chat history persistence in MongoDB
- Sidebar with previous chats
- Regenerate last assistant response
- Reply-to-message behavior
- Mode switcher:
  - Text Chat
  - Vision (image + prompt)
  - File Input (PDF/TXT + prompt)
  - Image Generation
- Model switcher (gpt-4o-mini default)
- Dark glassmorphism UI with responsive layout
- Error toasts, smooth transitions, and loading state handling

## Project Structure

```
client/
  index.html
  style.css
  app.js

server/
  config/
    db.js
  controllers/
    chatController.js
  middleware/
    uploadMiddleware.js
  models/
    Chat.js
  routes/
    chatRoutes.js
  services/
    fileService.js
    openaiService.js
  .env
  .env.example
  server.js
  package.json
```

## Setup

1. Install server dependencies:

```bash
cd server
npm install
```

2. Configure environment variables:

- Copy `server/.env.example` to `server/.env`
- Fill in:
  - `MONGODB_URI`
  - `OPENAI_API_KEY`

3. Run backend:

```bash
cd server
npm run dev
```

4. Run frontend:

- Open `client/index.html` directly, or serve it with a static server:

```bash
npx serve ../client -l 3000
```

5. Open the app:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

## API Endpoints

- `POST /api/chat` (streamed NDJSON response)
- `GET /api/chats`
- `GET /api/chats/:id`

## Notes

- The backend accepts environment key fallbacks (`MONGO_DB`, `OPEN_API_KEY`) for compatibility, but `MONGODB_URI` and `OPENAI_API_KEY` are recommended.
- File mode extracts text from PDF/TXT and sends it to the model as context.
- Vision mode sends image + text prompt to OpenAI Chat Completions.
