# Folder Responsibilities — TodosApp

> **Status:** Planned — no source code exists yet.  
> **Last Updated:** 2026-05-24  
> This document defines what code belongs in each directory. Follow this strictly to maintain consistency.

---

## Recommended Project Structure (Full-Stack JS Monorepo)

```
TodosApp/
├── project-docs/          ← AI knowledge base (this directory)
├── client/                ← Frontend application
│   ├── public/            ← Static assets (favicon, fonts, images)
│   ├── src/
│   │   ├── assets/        ← Images, icons, SVGs used in code
│   │   ├── components/    ← Reusable UI components (dumb)
│   │   │   ├── ui/        ← Generic atoms: Button, Input, Modal, Badge
│   │   │   ├── todos/     ← Todo-specific: TodoCard, TodoList, TodoForm
│   │   │   ├── tags/      ← Tag-specific: TagBadge, TagSelector
│   │   │   └── layout/    ← Header, Sidebar, Footer, PageWrapper
│   │   ├── pages/         ← Route-level page components (smart)
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── TodoDetail.tsx
│   │   ├── hooks/         ← Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useTodos.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useDebounce.ts
│   │   ├── store/         ← Global state management
│   │   │   ├── index.ts   ← Store configuration + exports
│   │   │   ├── authSlice.ts
│   │   │   ├── todosSlice.ts
│   │   │   ├── tagsSlice.ts
│   │   │   └── uiSlice.ts
│   │   ├── services/      ← API calls (axios/fetch wrappers)
│   │   │   ├── api.ts     ← Axios instance, interceptors
│   │   │   ├── authService.ts
│   │   │   ├── todoService.ts
│   │   │   └── tagService.ts
│   │   ├── types/         ← TypeScript interfaces and types
│   │   │   └── index.ts
│   │   ├── utils/         ← Pure utility functions
│   │   │   ├── dateUtils.ts
│   │   │   ├── formatters.ts
│   │   │   └── validators.ts
│   │   ├── constants/     ← App-wide constants
│   │   │   └── index.ts
│   │   ├── styles/        ← Global CSS, theme tokens
│   │   │   ├── globals.css
│   │   │   └── variables.css
│   │   ├── App.tsx        ← Root component + router setup
│   │   └── main.tsx       ← Entry point
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                ← Backend application
│   ├── src/
│   │   ├── routes/        ← Express route definitions only (thin layer)
│   │   │   ├── auth.ts
│   │   │   ├── todos.ts
│   │   │   └── tags.ts
│   │   ├── controllers/   ← Request/response handling + HTTP layer
│   │   │   ├── authController.ts
│   │   │   ├── todosController.ts
│   │   │   └── tagsController.ts
│   │   ├── services/      ← Business logic (framework-agnostic)
│   │   │   ├── authService.ts
│   │   │   ├── todosService.ts
│   │   │   └── tagsService.ts
│   │   ├── models/        ← Database access / ORM queries
│   │   │   ├── userModel.ts
│   │   │   ├── todoModel.ts
│   │   │   └── tagModel.ts
│   │   ├── middleware/    ← Express middleware
│   │   │   ├── auth.ts    ← JWT verification
│   │   │   ├── validate.ts ← Zod request validation
│   │   │   └── errorHandler.ts
│   │   ├── validators/    ← Zod schemas for request bodies
│   │   │   ├── authSchemas.ts
│   │   │   └── todoSchemas.ts
│   │   ├── utils/         ← Shared utility functions
│   │   │   ├── jwt.ts
│   │   │   ├── hash.ts
│   │   │   └── logger.ts
│   │   ├── config/        ← Environment + app configuration
│   │   │   └── index.ts
│   │   ├── db/            ← Database connection
│   │   │   └── index.ts
│   │   └── app.ts         ← Express app setup (no listen)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── tsconfig.json
│   └── package.json
│
├── shared/                ← Types/constants shared between client + server
│   └── types/
│       └── index.ts
│
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Directory Rules

### `components/ui/`
- **Contains:** Primitive, stateless, generic UI components
- **Examples:** `Button`, `Input`, `Modal`, `Badge`, `Spinner`, `Tooltip`
- **Rules:** No business logic, no API calls, fully controlled by props

### `components/todos/` `components/tags/`
- **Contains:** Feature-specific composite components
- **Examples:** `TodoCard`, `TodoList`, `TagBadge`
- **Rules:** May use hooks, may connect to store, but should be focused on display

### `pages/`
- **Contains:** Route-level smart components
- **Rules:** Handle data fetching orchestration, compose layout + feature components
- **One page = one route**

### `hooks/`
- **Contains:** Reusable React hooks only
- **Rules:** No JSX, must be prefixed with `use`, no direct DOM manipulation

### `services/` (frontend)
- **Contains:** All API call functions
- **Rules:** Return normalized data, handle HTTP errors, never import from components

### `store/`
- **Contains:** State management slices/atoms
- **Rules:** No side effects in reducers, use thunks/sagas for async

### `utils/`
- **Contains:** Pure functions only
- **Rules:** No imports from components, hooks, or store. Must be unit-testable.

### `routes/` (backend)
- **Contains:** Route mounting only — no logic
- **Rules:** 3–5 lines per route, delegate to controller immediately

### `controllers/` (backend)
- **Contains:** HTTP parsing and response formatting
- **Rules:** No database queries, call service layer only

### `services/` (backend)
- **Contains:** All business logic
- **Rules:** Framework-agnostic, no `req`/`res` objects, fully unit-testable

### `models/` (backend)
- **Contains:** All database queries via ORM
- **Rules:** No business logic, return plain objects

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `TodoCard.tsx` |
| Hooks | camelCase with `use` prefix | `useTodos.ts` |
| Services | camelCase | `todoService.ts` |
| Utils | camelCase | `dateUtils.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| CSS classes | kebab-case | `todo-card__title` |
| Database tables | snake_case | `todo_tags` |
| API routes | kebab-case | `/api/todos/:id/toggle` |
