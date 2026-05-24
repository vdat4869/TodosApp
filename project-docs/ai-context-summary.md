# AI Context Summary — TodosApp

> **Purpose:** This file is the entry point for all future AI interactions. It summarizes the project's state and points the AI to the relevant documentation.  
> **Instruction for AI:** Read this file first. DO NOT read the entire codebase. Rely on the linked documents and the module registry.

---

## 1. Project Identity
- **Name:** TodosApp
- **Purpose:** Task management application.
- **Current State:** Phase 0 (Foundation Setup) Completed. The NestJS backend is initialized with Prisma ORM, PostgreSQL database, and full Docker containerization.

## 2. Core Documentation Links
Before modifying any code, review the relevant documents:

- 🏗️ **[Architecture Overview](architecture.md):** High-level design and layers.
- 🥞 **[Tech Stack](tech-stack.md):** Languages, frameworks, and tools.
- 📁 **[Folder Responsibilities](folder-responsibilities.md):** Where code belongs.
- 📝 **[Coding Conventions](coding-conventions.md):** Style guides and patterns.
- 🗄️ **[Database Schema](database-schema.md):** Tables and relationships.
- 🌐 **[API Summary](api-summary.yaml):** REST endpoints.
- 🔀 **[Business Flows](business-flows.md):** Core user journeys.

## 3. How to Navigate the Codebase (For AI)
1. Do not `grep` the entire source tree blindly.
2. Check `module-registry.json` to find the exact file paths for components, routes, and services.
3. Check `dependency-graph.md` to understand how the module you are modifying interacts with others.
4. When adding a new feature:
   - Update `module-registry.json`.
   - Ensure it follows `folder-responsibilities.md`.

## 4. Current Priority / Next Steps
- **Phase 1: User Authentication**:
  - Create AuthModule and UserModule.
  - Implement SignUp, SignIn, Refresh Tokens, and SignOut.
  - Implement JWT strategy and Guard for protected routes.
  - Set up tests and verify authentication flows.
