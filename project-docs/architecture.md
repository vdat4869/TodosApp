# Architecture Overview — TodosApp

> **Status:** Project initialized. No implementation code exists yet.  
> **Last Updated:** 2026-05-24  
> **Source of Truth:** This document should be updated as the architecture evolves.

---

## 1. Project Purpose

**TodosApp** is a task/todo management application. It is a greenfield project currently containing only a `README.md`. The repository is hosted at `https://github.com/vdat4869/TodosApp`.

---

## 2. Intended Architecture (To Be Decided)

Since the project has no source code yet, the architecture below represents **recommended defaults** based on the project name and common patterns. Update this section when actual technology decisions are made.

```
┌─────────────────────────────────────────────────────────────┐
│                        TodosApp                              │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Frontend   │───▶│    API /     │───▶│   Database   │  │
│  │  (UI Layer)  │    │  Backend     │    │  (Storage)   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Likely Architectural Styles (choose one)
| Style | Description | Best For |
|-------|-------------|----------|
| **SPA + REST API** | React/Vue frontend + Express/FastAPI backend | Full decoupling, separate deploys |
| **Full-Stack Framework** | Next.js / Nuxt / SvelteKit | Fast development, SSR/SSG support |
| **Monolith MVC** | Django / Laravel / Rails | Simple team, quick MVP |
| **Serverless** | Vercel Functions / AWS Lambda | Low ops overhead |

---

## 3. Layer Responsibilities (Template)

| Layer | Responsibility | Technology (TBD) |
|-------|---------------|------------------|
| Presentation | Render UI, handle user events | React / Vue / HTML |
| Application | Business logic, use-cases | Node.js / Python / Go |
| Domain | Core entities: Todo, User, Tag | Language-native classes/types |
| Infrastructure | DB access, external APIs, file I/O | ORM / raw SQL / SDK |

---

## 4. Core Domain Entities

### Todo
```
Todo {
  id:          UUID / auto-increment
  title:       string (required)
  description: string (optional)
  completed:   boolean (default: false)
  priority:    enum(low, medium, high)
  due_date:    datetime (optional)
  created_at:  datetime
  updated_at:  datetime
  user_id:     FK → User
  tags:        Tag[]
}
```

### User
```
User {
  id:         UUID
  email:      string (unique)
  password:   hashed string
  created_at: datetime
}
```

### Tag
```
Tag {
  id:    UUID
  name:  string
  color: hex string
}
```

---

## 5. Data Flow (Expected)

```
User Action
    │
    ▼
UI Component (validates input)
    │
    ▼
API Call (HTTP / WebSocket / tRPC)
    │
    ▼
Backend Handler (auth + validation)
    │
    ▼
Service / Use-case Layer
    │
    ▼
Data Access Layer (ORM / Query)
    │
    ▼
Database (persistent store)
    │
    ▼
Response bubbles back up the chain
```

---

## 6. Open Architecture Questions

- [ ] Will this be a SPA, SSR, or native app?
- [ ] Will there be authentication (JWT, OAuth, session)?
- [ ] Single-user vs multi-user (collaborative todos)?
- [ ] Real-time sync needed (WebSockets)?
- [ ] Mobile support required?
- [ ] Offline-first capability?

---

## 7. Constraints & Non-Functional Requirements (NFRs)

| NFR | Target |
|-----|--------|
| Response time | < 200ms for CRUD operations |
| Availability | 99.9% uptime |
| Scalability | Support up to 10K concurrent users |
| Security | OWASP Top 10 compliance |
| Accessibility | WCAG 2.1 AA |

---

*Update this document when technology stack decisions are finalized.*
