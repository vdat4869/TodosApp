# Frontend State Map — TodosApp

> **Status:** Planned — no frontend code exists yet.  
> **Last Updated:** 2026-05-24  
> **State Management:** TBD (Zustand / Redux Toolkit / Jotai / React Context)

---

## 1. Global State Slices

### `authSlice` — Authentication State

```typescript
interface AuthState {
  user: User | null;           // Currently logged in user
  accessToken: string | null;  // JWT access token
  isAuthenticated: boolean;    // Derived: user !== null
  isLoading: boolean;          // Auth check in progress
  error: string | null;        // Login/register error message
}

// Initial state
const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Actions
- login(email, password) → async thunk → sets user + token
- register(email, password) → async thunk
- logout() → clears user + token
- refreshToken() → silently refreshes access token
- clearError() → resets error field
```

---

### `todosSlice` — Todos State

```typescript
interface TodosState {
  items: Todo[];               // All loaded todos
  selectedTodo: Todo | null;   // Currently viewed/editing todo
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  filter: TodoFilter;          // Current filter settings
  sort: TodoSort;              // Current sort settings
}

interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  tagId: string | null;
  search: string;
}

interface TodoSort {
  field: 'created_at' | 'due_date' | 'priority' | 'title';
  order: 'asc' | 'desc';
}

// Actions
- fetchTodos(filter) → async thunk
- createTodo(data) → async thunk → optimistic update
- updateTodo(id, data) → async thunk → optimistic update
- deleteTodo(id) → async thunk → optimistic update
- toggleTodo(id) → async thunk → optimistic update
- setFilter(filter) → sync, triggers re-fetch
- setSort(sort) → sync, triggers re-fetch
- selectTodo(todo) → sync
- clearError() → sync
```

---

### `tagsSlice` — Tags State

```typescript
interface TagsState {
  items: Tag[];
  isLoading: boolean;
  error: string | null;
}

// Actions
- fetchTags() → async thunk
- createTag(name, color) → async thunk
- deleteTag(id) → async thunk
```

---

### `uiSlice` — UI/Modal State

```typescript
interface UIState {
  isCreateTodoModalOpen: boolean;
  isEditTodoModalOpen: boolean;
  isTagManagerOpen: boolean;
  isDeleteConfirmOpen: boolean;
  pendingDeleteId: string | null;
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
}

// Actions
- openCreateTodoModal()
- closeCreateTodoModal()
- openEditTodoModal(todoId)
- closeEditTodoModal()
- openTagManager()
- closeTagManager()
- openDeleteConfirm(todoId)
- closeDeleteConfirm()
- setTheme(theme)
- toggleSidebar()
```

---

## 2. Derived / Computed State

| Derived Value | Source | Computation |
|---------------|--------|-------------|
| `filteredTodos` | `todos.items + todos.filter` | Filter items array |
| `sortedTodos` | `filteredTodos + todos.sort` | Sort filtered array |
| `completedCount` | `todos.items` | `items.filter(t => t.completed).length` |
| `activeCount` | `todos.items` | `items.filter(t => !t.completed).length` |
| `overdueTodos` | `todos.items` | `items.filter(t => !t.completed && t.due_date < now)` |
| `isAuthenticated` | `auth.user` | `user !== null` |

---

## 3. React Query / Server State (Alternative Approach)

If using React Query instead of Redux:

```typescript
// Queries
useQuery(['todos', filter], () => fetchTodos(filter))
useQuery(['todo', id], () => fetchTodo(id))
useQuery(['tags'], fetchTags)
useQuery(['auth/me'], fetchCurrentUser)

// Mutations
useMutation(createTodo, { onSuccess: () => queryClient.invalidateQueries(['todos']) })
useMutation(updateTodo, { onMutate: optimisticUpdate })
useMutation(deleteTodo, { onMutate: optimisticRemove })
useMutation(toggleTodo, { onMutate: optimisticToggle })
```

---

## 4. Local Component State

| Component | Local State | Purpose |
|-----------|-------------|---------|
| `TodoForm` | `formValues`, `formErrors`, `isSubmitting` | Form field management |
| `FilterBar` | `localSearch` | Debounced search input |
| `TodoCard` | `isHovered` | Hover animation state |
| `TagSelector` | `isOpen`, `searchQuery` | Dropdown open state |
| `DatePicker` | `selectedDate`, `isOpen` | Calendar open state |

---

## 5. Persistence Strategy

| State | Storage | TTL |
|-------|---------|-----|
| `accessToken` | Memory only (or httpOnly cookie) | 15 minutes |
| `refreshToken` | httpOnly cookie | 7 days |
| `theme` | localStorage | Forever |
| `sidebarOpen` | localStorage | Forever |
| `filter` | sessionStorage or URL params | Session |

> **Security Note:** Never store tokens in localStorage if XSS is a concern. Prefer httpOnly cookies.

---

## 6. State Flow Diagram

```
User Action
    │
    ▼
React Component
    │
    ├── Local action → useState / useReducer
    │
    └── Global action → dispatch(thunk)
                              │
                              ▼
                        API Service call
                              │
                         Success? 
                        ┌─────┴─────┐
                       Yes          No
                        │           │
                   Update store   Set error
                        │           │
                   Component     Show error
                   re-renders    toast/message
```
