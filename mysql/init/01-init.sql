CREATE DATABASE IF NOT EXISTS nesnexdb;
USE nesnexdb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
  ('テストユーザー1', 'test1@example.com'),
  ('テストユーザー2', 'test2@example.com');