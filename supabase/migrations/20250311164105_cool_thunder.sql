/*
  # Initial Schema Setup for RFID Security System

  1. New Tables
    - users
      - id (uuid, primary key)
      - name (text)
      - email (text, unique)
      - card_id (text, unique)
      - access_level (text)
      - is_active (boolean)
      - created_at (timestamp)
    
    - access_logs
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - card_id (text)
      - location (text)
      - access_granted (boolean)
      - timestamp (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  card_id text UNIQUE NOT NULL,
  access_level text NOT NULL DEFAULT 'user',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Access logs table
CREATE TABLE IF NOT EXISTS access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  card_id text NOT NULL,
  location text NOT NULL,
  access_granted boolean NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage users"
  ON users
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for access_logs table
CREATE POLICY "Users can read own access logs"
  ON access_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all access logs"
  ON access_logs
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Insert sample data
INSERT INTO users (name, email, card_id, access_level)
VALUES
  ('John Smith', 'john@example.com', 'RFID-001', 'admin'),
  ('Alice Johnson', 'alice@example.com', 'RFID-002', 'user'),
  ('Bob Wilson', 'bob@example.com', 'RFID-003', 'user')
ON CONFLICT DO NOTHING;