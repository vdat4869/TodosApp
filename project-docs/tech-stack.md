# Technology Stack — TodosApp

> **Status:** Not yet decided. Project is uninitialized.  
> **Last Updated:** 2026-05-24

---

## Current State

The project contains only a `README.md`. No language, framework, or tooling has been committed. This document should be updated as soon as the stack is selected.

---

## Recommended Stack Options

### Option A — Full-Stack JavaScript (Most Common for Todos Apps)

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | React | 18.x | Large ecosystem, hooks-based |
| Routing | React Router | 6.x | Industry standard SPA routing |
| State | Zustand or Redux Toolkit | latest | Lightweight vs full-featured |
| Styling | Tailwind CSS | 3.x | Utility-first, fast prototyping |
| Backend | Node.js + Express | 20 LTS / 4.x | JS everywhere |
| ORM | Prisma | 5.x | Type-safe, great DX |
| Database | PostgreSQL | 15.x | Relational, reliable |
| Auth | JWT + bcrypt | — | Stateless auth |
| Testing | Vitest + Playwright | latest | Fast unit + E2E |
| Bundler | Vite | 5.x | Fast HMR |
| CI/CD | GitHub Actions | — | Native to repo |

### Option B — Next.js Full-Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.x |
| DB | Supabase (PostgreSQL) | — |
| Auth | NextAuth.js | 5.x |
| ORM | Drizzle ORM | latest |
| Styling | Tailwind CSS | 3.x |
| State | Jotai | latest |
| Deployment | Vercel | — |

### Option C — Python Backend

| Layer | Technology | Version |
|-------|-----------|---------|
| Backend | FastAPI | 0.111.x |
| ORM | SQLAlchemy + Alembic | 2.x |
| Database | PostgreSQL | 15.x |
| Auth | python-jose + passlib | — |
| Frontend | React (separate repo) or Jinja2 | — |

---

## Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| TBD | — | — | — |

> **Action Required:** Fill this table when stack is chosen.

---

## Development Tooling (Proposed)

| Tool | Purpose |
|------|---------|
| ESLint | JavaScript linting |
| Prettier | Code formatting |
| Husky | Pre-commit hooks |
| lint-staged | Staged file linting |
| dotenv | Environment variable management |
| Docker | Containerized development |
| docker-compose | Multi-service local dev |

---

## Runtime Requirements

| Requirement | Value |
|-------------|-------|
| Node.js version | >= 20 LTS (if JS) |
| Python version | >= 3.11 (if Python) |
| Package manager | npm / pnpm / yarn |
| OS | Cross-platform (Win/Mac/Linux) |

---

*Update this document when `package.json` / `requirements.txt` / `pyproject.toml` is created.*
