-- Book My Ticket DB Schema
-- Run this in Supabase SQL Editor or similar platform that you are using


-- creating a seats table
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    isbooked INT DEFAULT 0
);

-- here we insert seat between 1 to 40 in seats table (total - 40 seats)
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 40);


-- we create users table to store users information
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(55) NOT NULL,
  last_name VARCHAR(55),
  email VARCHAR(322) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);