# Notes App

A full-stack notes application built with Express.js and React.

## Running the Backend

```bash
cd server
npm install
npm start
```

The backend runs on `http://localhost:5000`.

## Running the Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get a single note |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## Assumptions & Decisions

- **In-memory storage**: Notes are stored in a plain array in `app.js`. Data resets on every server restart.
- **CORS enabled globally**: The backend allows requests from any origin to keep local development simple.
- **Frontend uses Vite**: The frontend is scaffolded with Vite + React, so the dev command is `npm run dev`.
