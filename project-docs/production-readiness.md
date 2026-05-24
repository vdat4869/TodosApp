# Production Readiness Checklist — TodosApp

> **Status:** Pre-implementation.  
> **Last Updated:** 2026-05-24

This document outlines the criteria required before the application can be considered ready for a production release.

---

## 1. Code Quality & Architecture
- [ ] No `TODO` or `FIXME` comments for critical logic.
- [ ] Code follows documented conventions.
- [ ] No circular dependencies.
- [ ] Static analysis (ESLint, TypeScript strict mode) passes with 0 warnings/errors.

## 2. Security
- [ ] Passwords hashed securely.
- [ ] JWT tokens implemented securely (refresh token rotation, secure cookies).
- [ ] Ownership validation on all data modification endpoints.
- [ ] Rate limiting implemented for Auth and API endpoints.
- [ ] CORS configured to restrict origins.
- [ ] No sensitive secrets committed to version control.
- [ ] Dependency audit passes without high/critical vulnerabilities.

## 3. Performance
- [ ] Database indexes created for common queries.
- [ ] Frontend bundle size minimized and split.
- [ ] Static assets optimized.
- [ ] Compression (GZIP/Brotli) enabled on server.

## 4. Testing
- [ ] Unit test coverage > 70%.
- [ ] Critical integration tests written and passing.
- [ ] Core E2E flows (login, create todo) passing.

## 5. Deployment & Operations
- [ ] CI/CD pipeline fully automated.
- [ ] Infrastructure as Code (or repeatable deployment steps) documented.
- [ ] Environment variables configured for production (e.g., `NODE_ENV=production`).
- [ ] Database backups configured.
- [ ] Logging implemented (errors, critical business events).
- [ ] Basic monitoring/alerting set up (uptime checks).

## 6. Documentation
- [ ] API documentation updated.
- [ ] Readme contains setup and deployment instructions.
