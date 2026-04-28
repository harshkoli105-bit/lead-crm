-- ============================================================
--  Lead Management System — Database Schema
--  Run this file in psql or any PostgreSQL client
-- ============================================================

-- 1. Create database (run this separately as superuser if needed)
-- CREATE DATABASE lead_crm;

-- 2. Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  phone      VARCHAR(15)   NOT NULL,
  source     VARCHAR(20)   NOT NULL DEFAULT 'Call',
  status     VARCHAR(30)   NOT NULL DEFAULT 'Interested',
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_leads_status     ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- 4. Constraints — keep data clean
ALTER TABLE leads
  ADD CONSTRAINT chk_source CHECK (source IN ('Call', 'WhatsApp', 'Field')),
  ADD CONSTRAINT chk_status CHECK (status IN ('Interested', 'Not Interested', 'Converted'));

-- 5. Sample dummy data
INSERT INTO leads (name, phone, source, status) VALUES
  ('Ravi Kumar',      '9876543210', 'Call',      'Interested'),
  ('Priya Sharma',    '8765432109', 'WhatsApp',  'Converted'),
  ('Amit Patel',      '7654321098', 'Field',     'Not Interested'),
  ('Sneha Nair',      '6543210987', 'Call',      'Interested'),
  ('Rohit Verma',     '9988776655', 'WhatsApp',  'Interested'),
  ('Deepa Reddy',     '8877665544', 'Field',     'Converted'),
  ('Arjun Singh',     '7766554433', 'Call',      'Not Interested'),
  ('Kavita Joshi',    '6655443322', 'WhatsApp',  'Interested'),
  ('Suresh Mehta',    '9900112233', 'Field',     'Converted'),
  ('Meena Pillai',    '8811223344', 'Call',      'Interested');
