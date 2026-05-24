# Scalability Analysis — TodosApp

> **Status:** Pre-implementation analysis.  
> **Last Updated:** 2026-05-24

---

## 1. Scalability Dimensions

### Database Scalability (PostgreSQL)
- **Vertical Scaling:** The primary database can be scaled up (more CPU/RAM) easily in cloud environments (e.g., AWS RDS).
- **Read Replicas:** If read traffic (fetching todos) outweighs write traffic, read replicas can be added to distribute load.
- **Connection Pooling:** Implementing a connection pooler like PgBouncer is critical before scaling the application tier to prevent exhausting DB connections.

### Application Tier Scalability (Node.js/Backend)
- **Statelessness:** The backend must be completely stateless. JWTs for authentication enable horizontal scaling without sticky sessions.
- **Horizontal Scaling:** Deploy multiple instances of the backend API behind a Load Balancer.

### Frontend Scalability
- **CDN:** Serve static assets (HTML, CSS, JS bundles) via a Content Delivery Network (e.g., Cloudflare, AWS CloudFront) to reduce server load and decrease latency for global users.
- **Code Splitting:** Ensures initial load times remain fast even as the application grows in complexity.

---

## 2. Potential Bottlenecks

1. **Database Connections:** Node.js can quickly open many connections. *Mitigation: Connection pooling.*
2. **Search Operations:** Full-text search on `todos` might become slow with large datasets. *Mitigation: GIN indexes, eventually moving search to Elasticsearch if scale demands.*
3. **Large Todo Lists:** Rendering thousands of todos on the frontend. *Mitigation: Pagination or Virtual Scrolling.*

---

## 3. Scale-Up Milestones

| Milestone | Action Required |
| --------- | --------------- |
| MVP / 100 Users | Single server, single DB instance. |
| 1,000 Active Users | Separate DB and App servers. Implement caching for static assets. |
| 10,000 Active Users | Multiple App instances behind a Load Balancer. DB Read Replicas. Implement connection pooling. |
| 100,000 Active Users | Dedicated caching layer (Redis) for session/frequent queries. Optimize DB indexes further. |
