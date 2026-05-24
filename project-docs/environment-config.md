# Environment Configuration — TodosApp

> **Status:** Planned.  
> **Last Updated:** 2026-05-24

This document defines the required environment variables for the application.

---

## Security Warning
**NEVER commit actual `.env` files to version control.** Only commit `.env.example`.

---

## Backend Environment Variables

| Variable Name | Description | Example Value | Required? |
| ------------- | ----------- | ------------- | --------- |
| `NODE_ENV` | Running environment | `development`, `production` | Yes |
| `PORT` | API server port | `3000` | No (Defaults to 3000) |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/todosapp` | Yes |
| `JWT_SECRET` | Secret key for signing access tokens | `supersecretkey_change_me_in_prod` | Yes |
| `JWT_REFRESH_SECRET`| Secret key for refresh tokens | `another_super_secret_key` | Yes |
| `CORS_ORIGIN` | Allowed frontend URL | `http://localhost:5173`, `https://todosapp.com` | Yes |

---

## Frontend Environment Variables

*(Note: Depending on the bundler (e.g., Vite), these might need a specific prefix like `VITE_`)*

| Variable Name | Description | Example Value | Required? |
| ------------- | ----------- | ------------- | --------- |
| `VITE_API_BASE_URL` | URL of the backend API | `http://localhost:3000/api` | Yes |

---

## `.env.example` Template

```env
# Backend
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todosapp"
JWT_SECRET="dev-secret-do-not-use-in-prod"
JWT_REFRESH_SECRET="dev-refresh-secret"
CORS_ORIGIN="http://localhost:5173"

# Frontend (if monorepo, keep separate .env files)
VITE_API_BASE_URL="http://localhost:3000/api"
```
