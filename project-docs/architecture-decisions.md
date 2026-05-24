# Architecture Decisions Log (ADR) — TodosApp

> **Status:** Initialized.  
> **Last Updated:** 2026-05-24

This document acts as an Architecture Decision Record (ADR) to track significant architectural choices.

---

## Format

### ADR-[Number]: [Short Title]
- **Date:** YYYY-MM-DD
- **Status:** Proposed / Accepted / Rejected / Deprecated
- **Context:** What is the problem we are solving?
- **Decision:** What is the chosen solution?
- **Consequences:** What are the trade-offs (positive and negative)?

---

## Decision Log

### ADR-001: Separation of Project Documentation
- **Date:** 2026-05-24
- **Status:** Accepted
- **Context:** AI-assisted development requires deep, token-efficient context. Reading source code repeatedly is expensive and prone to hallucination.
- **Decision:** Establish a `/project-docs` directory containing structured markdown and JSON files acting as the single source of truth for architecture, conventions, and planning.
- **Consequences:**
  - *Positive:* AI sessions have instant, structured context. Reduced token usage. Better consistency.
  - *Negative:* Developers (and AI) must remember to keep these documents updated alongside code changes.
