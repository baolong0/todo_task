SET TIME ZONE 'UTC';

---------- BEGIN EXTENSIONS --------
CREATE EXTENSION "pgcrypto";

---------- END EXTENSIONS --------
CREATE TYPE TASK_STATUS AS ENUM (
  'undone',
  'done'
);

CREATE TYPE USER_ROLE AS ENUM (
  'admin',
  'user'
);

CREATE SCHEMA member;

CREATE SCHEMA app;

CREATE SCHEMA audit;

CREATE TABLE member.user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role USER_ROLE NOT NULL DEFAULT 'user',
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE TABLE app.task (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  due_time TIMESTAMP NOT NULL,
  status TASK_STATUS NOT NULL DEFAULT 'undone',
  created_by UUID REFERENCES member.user (id) NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE TABLE app.attachment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  path VARCHAR(200) NOT NULL,
  task_id UUID REFERENCES app.task (id) NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE TABLE audit.activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log VARCHAR(200) NOT NULL,
  task_id UUID REFERENCES app.task (id) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE app.tag (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  created_by UUID REFERENCES member.user (id) NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE TABLE app.task_tag (
  task_id UUID REFERENCES app.task (id) NOT NULL,
  tag_id UUID REFERENCES app.tag (id) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

