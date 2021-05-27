-- TVARCHAR(20)-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Authorization--
-- ---

DROP TABLE IF EXISTS auth;

CREATE TABLE auth (
  id SERIAL,
  username TEXT,
  pwhash TEXT,
  salt TEXT,
  type TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'session'
--
-- ---

DROP TABLE IF EXISTS session;

CREATE TABLE session (
  id SERIAL,
  user_id INTEGER,
  cookie TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'applicants'
--
-- ---

DROP TABLE IF EXISTS applicants;

CREATE TABLE applicants (
  id INTEGER,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  address1 TEXT,
  address2 TEXT NULL,
  city TEXT,
  state TEXT,
  country TEXT,
  zip INTEGER,
  phone TEXT,
  email TEXT,
  dob INTEGER,
  gender TEXT,
  PRIMARY KEY(id)
);

-- ---
-- Table 'employers'
--
-- ---

DROP TABLE IF EXISTS employers;

CREATE TABLE employers (
  id INTEGER,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  organization TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'calendar_events'
--
-- ---

DROP TABLE IF EXISTS calendar_events;

CREATE TABLE calendar_events (
  id SERIAL,
  user_id INTEGER,
  event_name TEXT,
  start_time INTEGER,
  end_time INTEGER,
  location TEXT,
  PRIMARY KEY(id)
);

-- ---
-- Table 'applications'
--
-- ---

DROP TABLE IF EXISTS applications;

CREATE TABLE applications (
  id SERIAL,
  job_id INTEGER,
  applicant_id INTEGER,
  resume INTEGER NULL,
  cover INTEGER NULL,
  submission_date INTEGER NULL,
  interest_level TEXT,
  status TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'documents'
--
-- ---

DROP TABLE IF EXISTS documents;

CREATE TABLE documents (
  id SERIAL,
  document_name TEXT,
  document_hash TEXT,
  text TEXT,
  PRIMARY KEY(id)
);

-- ---
-- Table 'notes'
--
-- ---

DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id SERIAL,
  user_id INTEGER,
  job_id INTEGER,
  content TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'job_postings'
--
-- ---

DROP TABLE IF EXISTS job_postings;

CREATE TABLE job_postings (
  id SERIAL,
  employer_id INTEGER,
  title TEXT,
  description TEXT,
  employment_type TEXT,
  experience_level TEXT,
  salary INTEGER,
  type_work TEXT,
  date_posted INTEGER,
  location INTEGER,
  PRIMARY KEY(id)
);