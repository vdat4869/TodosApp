# Business Flows — TodosApp

> **Last Updated:** 2026-05-24  
> These flows represent the core user journeys the application must support.

---

## 1. User Registration Flow

```
User fills registration form
  → Validates: email format, password strength, fields required
  → POST /api/auth/register
  → Backend: checks if email already exists
      ├── Email exists → 409 Conflict → Show error
      └── Email new →
            Hash password (bcrypt)
            Create User record
            Generate JWT
            → 201 Created + token
  → Frontend stores token (httpOnly cookie or localStorage)
  → Redirect to Dashboard
```

---

## 2. User Login Flow

```
User fills login form
  → POST /api/auth/login
  → Backend: finds user by email
      ├── User not found → 401 Unauthorized
      └── User found →
            Compare password (bcrypt.compare)
            ├── Wrong password → 401 Unauthorized
            └── Correct →
                  Generate JWT (15m access + 7d refresh)
                  → 200 OK + tokens
  → Frontend stores tokens
  → Redirect to Dashboard
```

---

## 3. View All Todos Flow

```
User visits Dashboard
  → (Auth check: is JWT valid?)
      └── Token expired → Redirect to Login
  → GET /api/todos (with optional ?status=&priority=&tag=&search=)
  → Backend: authenticates user via JWT middleware
      Queries todos WHERE user_id = currentUser.id
      Applies filters + sorting
      → 200 OK + todos[]
  → Frontend renders TodoList
```

---

## 4. Create Todo Flow

```
User clicks "Add Todo"
  → TodoForm modal opens
  → User fills: title (required), description, priority, due_date, tags
  → Validates locally (required fields)
  → POST /api/todos { title, description, priority, due_date, tag_ids }
  → Backend:
      Validates payload (zod schema)
      Creates Todo record (user_id = currentUser.id)
      Associates tags
      → 201 Created + todo
  → Frontend: adds todo to local state
  → Form closes, TodoList updates
```

---

## 5. Toggle Todo Complete Flow

```
User clicks checkbox on TodoCard
  → PATCH /api/todos/:id/toggle
  → Backend:
      Finds todo by id (WHERE user_id = currentUser.id → 403 if not owner)
      Flips completed boolean
      Sets completed_at = now() if completing, null if uncompleting
      → 200 OK + updated todo
  → Frontend: updates todo in local state (optimistic update)
```

---

## 6. Edit Todo Flow

```
User clicks "Edit" on TodoCard
  → TodoForm opens pre-filled with todo data
  → User edits fields
  → PUT /api/todos/:id { title, description, priority, due_date, tag_ids }
  → Backend:
      Validates ownership
      Validates payload
      Updates Todo record
      Syncs tags (remove old, add new)
      → 200 OK + updated todo
  → Frontend: updates todo in local state
```

---

## 7. Delete Todo Flow

```
User clicks "Delete" on TodoCard
  → Confirmation dialog shown
  → User confirms
  → DELETE /api/todos/:id
  → Backend:
      Validates ownership
      Soft-deletes OR hard-deletes todo
      → 204 No Content
  → Frontend: removes todo from local state
```

---

## 8. Filter & Search Todos Flow

```
User types in search bar or changes filter dropdowns
  → FilterBar emits onChange({ status, priority, tag, search })
  → useTodos hook updates query params
  → GET /api/todos?status=completed&priority=high&search=meeting
  → Backend applies WHERE clauses
  → Frontend re-renders filtered list
```

---

## 9. Manage Tags Flow

```
User opens tag management panel
  → GET /api/tags → renders existing tags
  → User creates tag: POST /api/tags { name, color }
  → User deletes tag: DELETE /api/tags/:id
      (Backend also removes todo-tag associations)
```

---

## 10. Logout Flow

```
User clicks Logout
  → POST /api/auth/logout
  → Backend invalidates refresh token (if stored server-side)
  → Frontend clears all tokens from storage
  → Redirect to Login
```

---

## Error Handling Policy

| HTTP Status | Meaning | Frontend Behavior |
|-------------|---------|-------------------|
| 400 | Validation error | Show field-level errors |
| 401 | Unauthorized / expired token | Redirect to login |
| 403 | Forbidden (wrong owner) | Show "access denied" toast |
| 404 | Not found | Show not-found message |
| 409 | Conflict (email exists) | Show inline error |
| 422 | Unprocessable entity | Show validation errors |
| 500 | Server error | Show generic error toast |
