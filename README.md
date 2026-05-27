# Todo List — Full Stack

A todo list app with a **Node.js + Express + Prisma + PostgreSQL** API and a **Next.js (TypeScript)** frontend.

## Project structure

```
todo-list-deploy-learning/
├── backend/     # Express API + Prisma
└── frontend/    # Next.js UI
```

## Prerequisites

- Node.js 18+ (for local dev without Docker)
- PostgreSQL running locally (or a hosted database like Neon)
- **OR** Docker Desktop (to run everything with one command)

## Run with Docker

```bash
cp .env.example .env   # edit passwords/ports if needed
docker compose up --build
```

Open http://localhost:3000 (change `WEB_PORT` / `API_PORT` in `.env` if you use other ports).

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and set your values:

| Variable       | Description                                      |
|----------------|--------------------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string                     |
| `PORT`         | API port (default `4000`)                        |
| `CORS_ORIGIN`  | Frontend URL (default `http://localhost:3000`)   |

```bash
npm install
npm run db:push      # create tables in PostgreSQL
npm run dev          # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

| Variable               | Description                    |
|------------------------|--------------------------------|
| `NEXT_PUBLIC_API_URL`  | Backend URL (default `http://localhost:4000`) |

```bash
npm install
npm run dev            # http://localhost:3000
```

## API endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/todos`      | List all todos     |
| GET    | `/api/todos/:id`  | Get one todo       |
| POST   | `/api/todos`      | Create todo        |
| PUT    | `/api/todos/:id`  | Update todo        |
| DELETE | `/api/todos/:id`  | Delete todo        |

### Create todo body

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Update todo body

```json
{
  "title": "Updated title",
  "description": "Optional",
  "completed": true
}
```
