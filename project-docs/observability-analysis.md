# Observability & Monitoring Analysis — TodosApp

> **Status:** Pre-implementation analysis.  
> **Last Updated:** 2026-05-24

---

## 1. Observability Pillars

### Logging
- **Format:** Structured logging (JSON format) to enable easy parsing by log aggregators (e.g., Datadog, ELK stack).
- **Levels:** Use appropriate log levels (`error`, `warn`, `info`, `debug`).
- **Context:** Include trace IDs in logs to correlate requests across services. Do NOT log PII or sensitive tokens.

### Metrics
- **System Metrics:** CPU, Memory, Disk I/O.
- **Application Metrics:** Request rates, Error rates, Response times (P50, P90, P99).
- **Business Metrics:** Number of active users, Number of todos created.

### Tracing
- Distributed tracing (e.g., OpenTelemetry) can be implemented later if the architecture moves towards microservices. For a monolith, request IDs passed through the middleware are sufficient.

---

## 2. Tools & Implementation

| Layer | Recommended Tooling |
| ----- | ------------------- |
| **Frontend Error Tracking** | Sentry (catches unhandled JS exceptions) |
| **Frontend Analytics** | Google Analytics or Plausible |
| **Backend Logging** | Pino or Winston (output to stdout, aggregated by external tool) |
| **Backend APM/Metrics** | Datadog, New Relic, or Prometheus/Grafana |
| **Uptime Monitoring** | UptimeRobot or Datadog Synthetics |

---

## 3. Alerting Strategy
- **Critical Alerts (Page on-call):** Database down, API returning > 5% 5xx errors, Frontend completely unreachable.
- **Warnings (Slack/Email):** Increased latency, increased 4xx errors, High CPU usage.
