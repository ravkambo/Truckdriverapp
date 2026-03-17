# Launch Roadmap — Truck Driver Application Portal
**Target: Production by March 31, 2026**
_Generated: March 17, 2026 · 14 days remaining_

---

## Executive Summary

The app is a 9-step FMCSA-compliant truck driver employment portal built on React 19 + FastAPI, deployed on Google Cloud Run with Cloud SQL (PostgreSQL). The core form flow is feature-complete. What stands between the current state and a production-ready launch are **security gaps, missing backend features, zero test coverage, and infrastructure hardening**.

---

## Current Status Snapshot

| Area | Status | Blocker? |
|---|---|---|
| 9-step form UI | ✅ Complete | No |
| Form validation (Zod) | ✅ Complete | No |
| Backend API (FastAPI) | ✅ Working | No |
| Database persistence | ✅ Working | No |
| PDF generation | ✅ Working | No |
| Docker + Cloud Build | ✅ Configured | No |
| File upload (Step 7) | ❌ Not implemented | Yes |
| Email notifications | ❌ Not implemented | Yes |
| Auth on admin endpoints | ❌ Public/unprotected | Yes |
| Hardcoded DB credentials | ❌ In cloudbuild.yaml | Yes |
| Tests (unit/integration) | ❌ None | Yes |
| Error handling | ⚠️ Minimal | No |
| README / docs | ⚠️ Outdated | No |
| Monitoring / logging | ❌ None | No |

---

## Week 1 — Critical Blockers (Mar 17–21)

These are **must-fix before any production deployment**.

### 🔴 Day 1–2: Security Fixes
- [ ] **Move DB password to GCP Secret Manager**
  - Remove hardcoded `YourStrongPassword123!` from `cloudbuild.yaml` line 29
  - Create secret `DB_PASS` in Secret Manager, grant Cloud Build access
  - Update `cloudbuild.yaml` to inject via `$$DB_PASS` secret substitution
- [ ] **Secure admin endpoints**
  - Add API key or GCP IAM-based auth to `GET /applications` and `POST /reset-database`
  - These endpoints expose all applicant PII — they must not be public

### 🔴 Day 2–3: File Upload Backend (Step 7 — Documents)
- [ ] Implement file receive endpoint in FastAPI (`POST /upload-document`)
  - Accept multipart/form-data
  - Store files in GCP Cloud Storage bucket (not local disk — Cloud Run is stateless)
  - Return a storage reference URL saved with the application record
- [ ] Wire frontend Step 7 to call the upload endpoint
- [ ] Add file type validation (PDF, JPG, PNG) and size limits (10MB max)

### 🔴 Day 3–4: Email Notifications
- [ ] Integrate a transactional email provider (SendGrid or GCP's email relay)
  - On successful submission: send confirmation email to applicant
  - On successful submission: send new application alert to hiring team
- [ ] Store email credentials as GCP secrets (never in code)
- [ ] Add email address to the application record schema

### 🟡 Day 4–5: Error Handling & UX Polish
- [ ] Replace bare `alert()` on form submission failure with an inline error message component
- [ ] Add React error boundary to catch unhandled frontend errors gracefully
- [ ] Add backend validation error responses (422 details surfaced to the user)
- [ ] Handle network timeout on form submission (retry logic or clear user message)

---

## Week 2 — Quality & Infrastructure (Mar 22–26)

### 🟡 Day 6–7: Testing
- [ ] **Backend tests** — write pytest suite covering:
  - `POST /submit-application` — valid payload, missing fields, duplicate submissions
  - `GET /applications` — auth required, correct data returned
  - File upload endpoint — valid file, oversized file, wrong type
- [ ] **Frontend smoke tests** — write at minimum:
  - Step navigation (next/back)
  - Form validation triggers correctly on each step
  - Successful submission flow (mock API)
- [ ] Set up test run in `cloudbuild.yaml` (fail build if tests fail)

### 🟡 Day 7–8: Monitoring & Logging
- [ ] Enable GCP Cloud Logging for both Cloud Run services
- [ ] Add structured logging to FastAPI (request ID, applicant email redacted, status codes)
- [ ] Set up a GCP Monitoring alert for:
  - Error rate > 1% on `/submit-application`
  - Cloud Run instance count spike (scaling alarm)
  - Cloud SQL connection failures
- [ ] Add GCP Uptime Check on the frontend URL

### 🟡 Day 8–9: Database & Performance
- [ ] Switch Cloud SQL to a dedicated instance (not shared tier) for production
- [ ] Confirm database connection pooling is configured (`pool_size`, `max_overflow` in SQLAlchemy)
- [ ] Add DB migration tooling (Alembic) so schema changes can be applied safely post-launch
- [ ] Run `EXPLAIN ANALYZE` on the applications query — add index if table grows large

### 🟡 Day 9–10: Documentation & README
- [ ] Rewrite `README.md`:
  - Remove stale Gemini API Key reference
  - Add local development setup (frontend + backend)
  - Add production deployment instructions
  - Document environment variables
- [ ] Update `cloudbuild.yaml` with comments explaining each step
- [ ] Document the admin endpoints (how to access, auth requirements)

---

## Week 3 — Staging Validation & Go-Live (Mar 27–31)

### Day 11–12: Staging Deployment (Mar 27–28)
- [ ] Deploy to a **separate staging Cloud Run service** using the same `cloudbuild.yaml` with a `--staging` trigger
- [ ] End-to-end test all 9 form steps in staging
- [ ] Test file upload flow in staging (Cloud Storage bucket)
- [ ] Test email delivery (confirmation + alert)
- [ ] Verify PDF download works in production build
- [ ] Test on mobile (iOS Safari, Android Chrome) — the form is mobile-first
- [ ] Test dark mode toggle

### Day 12–13: Load & Security Review (Mar 28–29)
- [ ] Run a basic load test against staging (simulate 50 concurrent applicants)
  - Tool: `k6` or `locust`
  - Target: p95 latency < 2s on form submission
- [ ] Verify no PII is logged in plaintext in Cloud Logging
- [ ] Confirm all secrets are sourced from Secret Manager (audit `cloudbuild.yaml`)
- [ ] Review CORS settings on FastAPI — restrict `allow_origins` to production domain only
- [ ] Confirm HTTPS is enforced on Cloud Run (it is by default, but verify)

### Day 14: Production Go-Live (Mar 30–31)
- [ ] Trigger production Cloud Build from `master`/`main` branch
- [ ] Verify production URLs are live (frontend + backend health check)
- [ ] Confirm Cloud SQL production instance is running with backups enabled
- [ ] Send a test application end-to-end in production
- [ ] Share production URL with stakeholders
- [ ] Set up on-call rotation or monitoring notification channel (Slack/email)

---

## Post-Launch (April)

These are deferred but important for long-term health:

- [ ] Admin dashboard — view/filter/export submitted applications (currently raw DB access only)
- [ ] Rate limiting on `/submit-application` (prevent spam/abuse)
- [ ] SSN / PII encryption at rest (currently stored in plain JSON)
- [ ] Full E2E test suite (Playwright)
- [ ] CI on pull requests (run lint + tests before merge)
- [ ] Background job queue for email sending (decouple from form submission response time)
- [ ] Applicant status tracking (under review, interview scheduled, hired)

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Cloud Build fails on deploy day | Medium | High | Test full pipeline in staging first |
| Email provider setup delayed | Medium | Medium | Use a simple SMTP fallback (Gmail) as interim |
| File upload to Cloud Storage blocked by IAM | Medium | Medium | Test permissions in staging Week 2 |
| DB schema needs change after data is in production | Low | High | Add Alembic migrations before go-live |
| PII data breach via unprotected admin endpoints | High (if not fixed) | Critical | Fix in Week 1 — non-negotiable |

---

## Definition of Done (Production-Ready Checklist)

Before flipping the switch, every item below must be checked:

- [ ] No hardcoded credentials anywhere in the codebase or config files
- [ ] Admin endpoints require authentication
- [ ] File upload works and files persist (Cloud Storage)
- [ ] Email confirmation sends on form submission
- [ ] Backend test suite passes in CI
- [ ] Monitoring alerts are active
- [ ] Staging end-to-end test completed and passed
- [ ] README is accurate and complete
- [ ] CORS restricted to production domain
- [ ] Cloud SQL has automated daily backups enabled
