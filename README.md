# GigFlow – Smart Leads Dashboard

A production-ready full-stack MERN application for managing sales leads with role-based access control, advanced filtering, and CSV export.

## Features

- **JWT Authentication** — Register, login, token persistence
- **Role-Based Access Control** — Admin (full access) and Sales (no delete)
- **Lead Management** — Create, view, update, delete leads
- **Advanced Filtering** — Filter by status, source, search, sort, paginate
- **CSV Export** — Export filtered leads (admin only)
- **Dark Mode** — Persisted theme toggle
- **Responsive Design** — Mobile-friendly layout

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, React Hook Form, Zod, Axios, Lucide React, React Router DOM

**Backend:** Node.js, Express 5, TypeScript, MongoDB Atlas, Mongoose, JWT, bcryptjs, Zod, json2csv

**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Folder Structure

```
gigflow/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── api/             # Axios + API functions
│       ├── components/      # UI, auth, layout, leads, dashboard
│       ├── constants/       # Lead statuses, sources, routes
│       ├── hooks/           # useDebounce, useTheme
│       ├── pages/           # LoginPage, RegisterPage, DashboardPage, etc.
│       ├── routes/          # AppRoutes, ProtectedRoute, RoleGuard
│       ├── store/           # Zustand stores (auth, lead, ui)
│       ├── styles/          # Design system CSS
│       ├── types/           # TypeScript interfaces
│       └── utils/           # cn, formatDate, downloadFile
│
└── server/                  # Express + TypeScript backend
    └── src/
        ├── config/          # Env validation
        ├── controllers/     # Auth + Lead controllers
        ├── middleware/       # Auth, role, error middleware
        ├── models/          # User + Lead Mongoose models
        ├── routes/          # Auth + Lead routes
        ├── seeds/           # Demo user seeder
        ├── services/        # Business logic
        ├── types/           # Express type augmentation
        ├── utils/           # ApiError, asyncHandler
        └── validators/      # Zod schemas
```

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### 1. Clone & Install

```bash
git clone <repo-url>
cd gigflow

cd server && npm install
cd ../client && npm install
```

### 2. Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/gigflow
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Locally

```bash
# Terminal 1 – Backend
cd server && npm run dev

# Terminal 2 – Frontend
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Credentials

| Role  | Email                | Password  |
|-------|----------------------|-----------|
| Admin | admin@example.com    | Admin@123 |
| Sales | sales@example.com    | Sales@123 |

> Demo users are auto-seeded on first server start.

## API Documentation

### Base URL
`http://localhost:5000/api`

### Auth Endpoints

#### POST /auth/register
```json
// Request
{ "name": "Jane", "email": "jane@example.com", "password": "Jane@1234", "role": "sales" }

// Response 201
{ "success": true, "message": "Registration successful", "data": { "token": "...", "user": {...} } }
```

#### POST /auth/login
```json
// Request
{ "email": "admin@example.com", "password": "Admin@123" }

// Response 200
{ "success": true, "message": "Login successful", "data": { "token": "...", "user": {...} } }
```

#### GET /auth/me
```
Headers: Authorization: Bearer <token>

// Response 200
{ "success": true, "data": { "id": "...", "name": "...", "email": "...", "role": "admin" } }
```

### Lead Endpoints

All lead endpoints require `Authorization: Bearer <token>`.

#### GET /leads
Query params: `status`, `source`, `search`, `sort` (latest|oldest), `page`, `limit`

```json
// Response 200
{
  "success": true,
  "data": [...],
  "pagination": { "page": 1, "limit": 10, "total": 42, "pages": 5 }
}
```

#### GET /leads/:id
```json
// Response 200
{ "success": true, "data": { "_id": "...", "name": "...", ... } }
```

#### POST /leads
```json
// Request
{ "name": "John Doe", "email": "john@example.com", "source": "Website", "status": "New" }

// Response 201
{ "success": true, "message": "Lead created", "data": {...} }
```

#### PATCH /leads/:id
```json
// Request (partial)
{ "status": "Qualified" }

// Response 200
{ "success": true, "message": "Lead updated", "data": {...} }
```

#### DELETE /leads/:id
Admin only. Returns `200` with `{ "success": true, "message": "Lead deleted" }`.

#### GET /leads/export/csv
Admin only. Returns CSV file download with currently filtered leads.

### Error Responses
```json
{ "success": false, "message": "Error description", "data": null }
```
Status codes: `400` validation, `401` unauthenticated, `403` unauthorized, `404` not found, `409` conflict, `500` server error.

## Deployment

### Backend (Render)
1. Connect GitHub repo
2. Root directory: `server`
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables in Render dashboard

### Frontend (Vercel)
1. Connect GitHub repo
2. Root directory: `client`
3. Framework preset: Vite
4. Add `VITE_API_URL=https://your-render-url.onrender.com/api`

### Docker
```bash
# Copy and fill in server/.env
cp server/.env.example server/.env

docker-compose up --build
```

## Loom Demo
[Demo video link]

## Live URLs
- Frontend: [https://gigflow.vercel.app]
- Backend: [https://gigflow-api.onrender.com]
