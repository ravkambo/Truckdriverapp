-- ============================================================
-- Cargo Clarity — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Applications table
-- raw_data stores the complete JSON payload as JSONB so you
-- can query into nested fields if needed (e.g. raw_data->'personal'->>'ssn')
CREATE TABLE IF NOT EXISTS applications (
    id          BIGSERIAL PRIMARY KEY,
    first_name  TEXT        NOT NULL DEFAULT '',
    last_name   TEXT        NOT NULL DEFAULT '',
    email       TEXT        NOT NULL DEFAULT '',
    phone       TEXT        NOT NULL DEFAULT '',
    status      TEXT        NOT NULL DEFAULT 'Pending',
    pdf_path    TEXT,
    raw_data    JSONB       NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for the most common admin queries
CREATE INDEX IF NOT EXISTS idx_applications_email      ON applications (email);
CREATE INDEX IF NOT EXISTS idx_applications_last_name  ON applications (last_name);
CREATE INDEX IF NOT EXISTS idx_applications_status     ON applications (status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications (created_at DESC);

-- Row Level Security
-- The backend connects with the service_role key which bypasses RLS,
-- so no additional policies are needed. Enable RLS anyway so the
-- anon/authenticated keys cannot accidentally access this table
-- from the client side.
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
