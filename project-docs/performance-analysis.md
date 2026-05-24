# Performance Analysis — TodosApp

> **Status:** Pre-implementation analysis. Update when code is written.  
> **Last Updated:** 2026-05-24

---

## Performance Goals

| Metric | Target | Priority |
|--------|--------|----------|
| First Contentful Paint (FCP) | < 1.5s | High |
| Time to Interactive (TTI) | < 3.0s | High |
| Largest Contentful Paint (LCP) | < 2.5s | High |
| API response time (P95) | < 200ms | High |
| API response time (P99) | < 500ms | Medium |
| Todo list render (1000 items) | < 16ms | Medium |
| Bundle size (initial JS) | < 200KB gzipped | High |

---

## Frontend Performance Strategy

### Code Splitting
- Route-level lazy loading with `React.lazy()` + `Suspense`
- Vendor chunk splitting in Vite config
- Dynamic imports for heavy components (date pickers, rich text editors)

```typescript
// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TodoDetail = React.lazy(() => import('./pages/TodoDetail'));
```

### Rendering Optimization
- **React.memo** on `TodoCard` — only re-renders when todo changes
- **useMemo** for filtered/sorted todo computations
- **useCallback** for stable event handler references
- **Virtual scrolling** (react-window or react-virtual) for lists > 100 items

```typescript
// Memoize expensive filtering
const filteredTodos = useMemo(
  () => todos.filter(applyFilter(filter)).sort(applySort(sort)),
  [todos, filter, sort]
);
```

### Network Optimization
- **Request deduplication** via React Query caching
- **Optimistic updates** for toggle/delete operations (no wait for server)
- **Debounced search** (300ms delay before API call)
- **HTTP cache headers** on GET /todos (Cache-Control: private, max-age=30)
- **Request batching** if multiple tags are deleted in sequence

### Asset Optimization
- All images in WebP format
- SVG icons inlined or sprited
- CSS purging (remove unused Tailwind classes)
- Font preloading for primary typeface

---

## Backend Performance Strategy

### Database Query Optimization
- Index on `todos.user_id`, `todos.completed`, `todos.priority`, `todos.due_date`
- Full-text search index (`GIN`) on title + description
- Paginate large result sets: default page size = 50
- Use `SELECT` only needed columns — never `SELECT *`
- Connection pooling via Prisma (PgBouncer in production)

### API Caching
- Redis (optional) for frequently accessed data:
  - User's tag list (changes infrequently)
  - User profile data
- Cache invalidation on mutation

### Server-Side Optimization
- GZIP/Brotli response compression middleware
- `Content-Security-Policy` headers
- Rate limiting per IP + per user

---

## Performance Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Unvirtualized long todo list | High CPU on render | React-virtual / pagination |
| No debouncing on search | Too many API calls | 300ms debounce |
| N+1 query on tags | Slow todo listing | Eager-load tags with todos |
| No DB connection pooling | Connection exhaustion | PgBouncer |
| Large initial bundle | Slow FCP | Code splitting + lazy routes |
| Missing DB indexes | Slow queries at scale | Indexes defined in schema |

---

## Monitoring Checklist (When App Is Live)
- [ ] Set up Web Vitals reporting (reportWebVitals)
- [ ] Add server-side response time logging
- [ ] Set up DB slow query logging (> 100ms)
- [ ] Integrate performance monitoring (Datadog / New Relic / Sentry Performance)
- [ ] Set up Lighthouse CI in GitHub Actions
