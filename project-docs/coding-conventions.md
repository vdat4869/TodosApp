# Coding Conventions — TodosApp

> **Last Updated:** 2026-05-24  
> These conventions MUST be followed by all contributors and AI code generators.  
> Violations should be caught by linting/formatting tools.

---

## 1. Language & Formatting

### General
- **Indentation:** 2 spaces (no tabs)
- **Line length:** Max 100 characters
- **Quotes:** Single quotes `'` in JS/TS; double quotes in HTML attributes
- **Semicolons:** Required in TypeScript/JavaScript
- **Trailing commas:** Required in multi-line arrays/objects
- **End of file:** Always a newline

### TypeScript
- **Strict mode:** `"strict": true` in tsconfig — no exceptions
- **No `any`:** Use `unknown` with type guards, or proper types
- **No `!` non-null assertion** unless absolutely certain — add a comment if used
- **Prefer `interface` over `type`** for object shapes; use `type` for unions/primitives
- **Explicit return types** on all exported functions
- **Prefer `const` over `let`** — never use `var`

```typescript
// ✅ Good
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const createTodo = async (data: CreateTodoRequest): Promise<Todo> => {
  // ...
};

// ❌ Bad
type Todo = {
  id: any;
  title: string;
};

async function createTodo(data) {
  // ...
}
```

---

## 2. React Conventions

### Component Structure
```typescript
// File: TodoCard.tsx
import React from 'react';
import { Todo } from '../types';
import styles from './TodoCard.module.css';

// 1. Interface definition first
interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

// 2. Component (arrow function, named export)
export const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  // 3. Hooks first
  const [isHovered, setIsHovered] = React.useState(false);

  // 4. Derived values
  const isOverdue = todo.dueDate ? new Date(todo.dueDate) < new Date() : false;

  // 5. Event handlers (prefixed with handle)
  const handleToggle = () => onToggle(todo.id);
  const handleDelete = () => onDelete(todo.id);
  const handleEdit = () => onEdit(todo);

  // 6. Render
  return (
    <div className={styles.card}>
      {/* JSX */}
    </div>
  );
};
```

### Component Rules
- **No default exports** — always use named exports
- **One component per file**
- **Props interface named `[ComponentName]Props`**
- **Event handlers prefixed with `handle`** (not `on`)
- **Do NOT use class components** — functional components + hooks only
- **Keep components under 200 lines** — split if larger
- **Render `null` over conditional rendering complexity** when hiding content

---

## 3. Hook Conventions

```typescript
// File: useTodos.ts
import { useState, useEffect, useCallback } from 'react';

// Must start with `use`
export const useTodos = (filter: TodoFilter) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await todoService.getAll(filter);
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return { todos, isLoading, error, refetch: fetchTodos };
};
```

---

## 4. API Service Conventions

```typescript
// File: todoService.ts
import { apiClient } from './api';
import { Todo, CreateTodoRequest, UpdateTodoRequest, TodoFilter } from '../types';

// All functions are async and return typed results
export const todoService = {
  getAll: async (filter: TodoFilter): Promise<Todo[]> => {
    const { data } = await apiClient.get<Todo[]>('/todos', { params: filter });
    return data;
  },

  getById: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.get<Todo>(`/todos/${id}`);
    return data;
  },

  create: async (payload: CreateTodoRequest): Promise<Todo> => {
    const { data } = await apiClient.post<Todo>('/todos', payload);
    return data;
  },

  update: async (id: string, payload: UpdateTodoRequest): Promise<Todo> => {
    const { data } = await apiClient.put<Todo>(`/todos/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },

  toggle: async (id: string): Promise<Todo> => {
    const { data } = await apiClient.patch<Todo>(`/todos/${id}/toggle`);
    return data;
  },
};
```

---

## 5. Backend Controller Conventions

```typescript
// File: todosController.ts
import { Request, Response, NextFunction } from 'express';
import { todosService } from '../services/todosService';

// All controllers are async functions
export const getTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todos = await todosService.findAll(req.user!.id, req.query);
    res.json(todos);
  } catch (error) {
    next(error); // Always pass to error handler
  }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todo = await todosService.create(req.user!.id, req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};
```

---

## 6. Error Handling

### Frontend
```typescript
// Always wrap async calls in try/catch
// Show user-friendly messages, not raw error objects
try {
  await todoService.delete(id);
  dispatch(removeTodo(id));
  toast.success('Todo deleted');
} catch (error) {
  const message = getErrorMessage(error); // utility function
  toast.error(message);
}
```

### Backend
```typescript
// Custom error class
class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: FieldError[]
  ) {
    super(message);
  }
}

// Usage in service
if (!todo) {
  throw new AppError(404, 'Todo not found');
}

if (todo.userId !== userId) {
  throw new AppError(403, 'Access denied');
}
```

---

## 7. Comments & Documentation

- **JSDoc on all exported functions** in service and utility files
- **Inline comments for non-obvious logic** only — don't comment obvious code
- **TODO comments** format: `// TODO(yourname): description` — always include issue link
- **FIXME comments** format: `// FIXME: description` — must be resolved before production

```typescript
/**
 * Fetches all todos for the given user with optional filtering.
 * @param userId - The authenticated user's ID
 * @param filter - Optional filter/sort parameters
 * @returns Array of todos matching the filter
 */
export const findAll = async (userId: string, filter: TodoFilter): Promise<Todo[]> => {
  // ...
};
```

---

## 8. Git Conventions

### Branch Names
```
feature/add-todo-filters
bugfix/fix-toggle-optimistic-update
chore/setup-prisma-migrations
docs/update-api-docs
```

### Commit Messages (Conventional Commits)
```
feat: add todo priority filter to dashboard
fix: correct toggle endpoint URL in todoService
chore: add ESLint config
docs: update API summary with tags endpoints
refactor: extract useDebounce hook from FilterBar
test: add unit tests for authService
```

### PR Rules
- PR must reference an issue
- All CI checks must pass
- At least one review before merge (if team project)
- Squash merge preferred

---

## 9. Testing Conventions

- **Test files:** co-located as `ComponentName.test.tsx` or in `tests/` for backend
- **Naming:** `describe('[unit name]')` → `it('should [expected behavior]')`
- **Coverage target:** 80% for services, 70% overall
- **No skipped tests** in main branch — delete them instead

```typescript
describe('todosService', () => {
  it('should return all todos for the given user', async () => {
    // Arrange
    const userId = 'user-123';
    const mockTodos = [{ id: '1', title: 'Test', userId }];
    mockPrisma.todo.findMany.mockResolvedValue(mockTodos);

    // Act
    const result = await todosService.findAll(userId, {});

    // Assert
    expect(result).toEqual(mockTodos);
    expect(mockPrisma.todo.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId } })
    );
  });
});
```

---

## 10. Forbidden Patterns

| Pattern | Why Forbidden | Alternative |
|---------|--------------|-------------|
| `any` type | Defeats TypeScript | `unknown` + type guard |
| `console.log` in production | Leaks data | Logger utility |
| Hardcoded secrets/URLs | Security risk | Environment variables |
| Direct DOM manipulation | Breaks React | State + refs |
| `!important` in CSS | Hard to override | Increase specificity |
| Synchronous DB queries | Blocks thread | Always async/await |
| Storing JWT in localStorage | XSS risk | httpOnly cookie |
| `SELECT *` queries | Over-fetching | Explicit column selection |
