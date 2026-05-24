# Dependency Graph — TodosApp

> **Status:** No source code exists yet. Graph below is a **planned** dependency model.  
> **Last Updated:** 2026-05-24

---

## Module Dependency Graph (Planned)

```mermaid
graph TD
    %% Pages depend on components
    LoginPage --> AuthForm
    RegisterPage --> AuthForm
    DashboardPage --> TodoList
    DashboardPage --> FilterBar
    DashboardPage --> TodoForm
    TodoDetailPage --> TodoForm

    %% Components depend on smaller atoms
    TodoList --> TodoCard
    TodoCard --> Badge
    TodoCard --> Checkbox
    TodoForm --> Input
    TodoForm --> Textarea
    TodoForm --> DatePicker
    TodoForm --> TagSelector
    FilterBar --> Select
    FilterBar --> SearchInput

    %% Pages depend on hooks
    DashboardPage --> useTodos
    DashboardPage --> useAuth
    LoginPage --> useAuth
    RegisterPage --> useAuth
    TodoDetailPage --> useTodo

    %% Hooks depend on services
    useTodos --> todoService
    useTodo --> todoService
    useAuth --> authService

    %% Services depend on API client
    todoService --> apiClient
    authService --> apiClient
    tagService --> apiClient

    %% API client is the leaf
    apiClient --> httpClient["HTTP Client (axios/fetch)"]
```

---

## Backend Dependency Graph (Planned)

```mermaid
graph TD
    %% Routes call controllers
    authRouter --> authController
    todosRouter --> todosController
    tagsRouter --> tagsController

    %% Controllers call services
    authController --> authService
    todosController --> todosService
    tagsController --> tagsService

    %% Services call models/repositories
    authService --> userModel
    todosService --> todoModel
    tagsService --> tagModel

    %% Middleware
    todosRouter --> authMiddleware
    tagsRouter --> authMiddleware

    %% Models connect to DB
    userModel --> database
    todoModel --> database
    tagModel --> database
```

---

## External Dependencies (Planned)

| Package | Used By | Purpose |
|---------|---------|---------|
| react | All frontend | UI rendering |
| react-router-dom | App router | Client-side routing |
| axios | apiClient | HTTP requests |
| zustand / redux | State stores | Global state |
| react-hook-form | Forms | Form validation |
| zod | Validators | Schema validation |
| date-fns | DatePicker | Date utilities |
| express | Backend | HTTP server |
| prisma | Models | Database ORM |
| jsonwebtoken | authService | JWT signing |
| bcryptjs | authService | Password hashing |
| cors | Express middleware | CORS handling |

---

## Circular Dependency Rules

> **Rule:** No circular imports are allowed.  
> **Enforcement:** Use ESLint `import/no-cycle` rule.

Dependency direction MUST flow:
```
Pages → Components → Hooks → Services → API Client
                           → Store
```

Never:
- A service importing from a component
- A hook importing from a page
- A model importing from a controller

---

*Regenerate this graph after the first commit with actual source code.*
