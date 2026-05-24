# Project Mindmap — TodosApp

> **Status:** Planned.  
> **Last Updated:** 2026-05-24

---

## Mindmap

```mermaid
mindmap
  root((TodosApp))
    Frontend
      Pages
        Login
        Register
        Dashboard
        TodoDetail
      Components
        TodoCard
        TodoForm
        FilterBar
        TagSelector
      State Management
        Auth
        Todos
        Tags
    Backend API
      Auth
        POST /register
        POST /login
        POST /logout
      Todos
        GET /todos
        POST /todos
        PUT /todos/:id
        DELETE /todos/:id
        PATCH /todos/:id/toggle
      Tags
        GET /tags
        POST /tags
        DELETE /tags/:id
    Database
      users
      todos
      tags
      todo_tags
    DevOps
      GitHub Actions
      Linter / Formatter
      Testing (Vitest)
```
