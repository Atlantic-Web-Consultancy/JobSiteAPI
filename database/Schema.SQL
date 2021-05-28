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
  resume INTEGER,
  cover INTEGER,
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
  location TEXT,
  PRIMARY KEY(id)
);

-- ---
-- Table 'blog'
--
-- ---

DROP TABLE IF EXISTS blog;

CREATE TABLE blog (
  id SERIAL,
  first_name TEXT,
  last_name TEXT,
  date_posted BIGINT,
  title TEXT,
  content TEXT,
  PRIMARY KEY (id)
);


-- ---
-- Indexes
-- ---

CREATE INDEX CONCURRENTLY auth_id_index ON auth USING HASH (id);
CREATE INDEX CONCURRENTLY session_id_index ON session USING HASH (id);
CREATE INDEX CONCURRENTLY applicant_id_index ON applicants USING HASH (id);
CREATE INDEX CONCURRENTLY employer_id_index ON employers USING HASH (id);
CREATE INDEX CONCURRENTLY calendar_event_id_index ON calendar_events USING HASH (id);
CREATE INDEX CONCURRENTLY application_id_index ON applications USING HASH (id);
CREATE INDEX CONCURRENTLY document_id_index ON documents USING HASH (id);
CREATE INDEX CONCURRENTLY note_id_index ON notes USING HASH (id);
CREATE INDEX CONCURRENTLY job_posting_id_index ON job_postings USING HASH (id);
CREATE INDEX CONCURRENTLY blog_id_index ON blog USING HASH (id);

-- ---
-- INITIALIZE SERIALIZATION
-- ---

SELECT setval(pg_get_serial_sequence('auth', 'id'), coalesce(max(id)+1, 1), false) FROM auth;
SELECT setval(pg_get_serial_sequence('session', 'id'), coalesce(max(id)+1, 1), false) FROM session;
SELECT setval(pg_get_serial_sequence('applicants', 'id'), coalesce(max(id)+1, 1), false) FROM applicants;
SELECT setval(pg_get_serial_sequence('employers', 'id'), coalesce(max(id)+1, 1), false) FROM employers;
SELECT setval(pg_get_serial_sequence('calendar_events', 'id'), coalesce(max(id)+1, 1), false) FROM calendar_events;
SELECT setval(pg_get_serial_sequence('applications', 'id'), coalesce(max(id)+1, 1), false) FROM applications;
SELECT setval(pg_get_serial_sequence('documents', 'id'), coalesce(max(id)+1, 1), false) FROM documents;
SELECT setval(pg_get_serial_sequence('notes', 'id'), coalesce(max(id)+1, 1), false) FROM notes;
SELECT setval(pg_get_serial_sequence('job_postings', 'id'), coalesce(max(id)+1, 1), false) FROM job_postings;
SELECT setval(pg_get_serial_sequence('blog', 'id'), coalesce(max(id)+1, 1), false) FROM blog;

-- ---
-- SEED DATA
-- ---

-- COPY auth FROM 'jobsite_test_data/_applicants.csv' DELIMITER ',' CSV HEADER;
-- COPY session FROM 'jobsite_test_data/_session.csv' DELIMITER ',' CSV HEADER;
COPY applicants FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_applicants.csv' DELIMITER ',' CSV HEADER;
COPY employers FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_employers.csv' DELIMITER ',' CSV HEADER;
COPY calendar_events FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_calendar_events.csv' DELIMITER ',' CSV HEADER;
COPY applications FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_applications.csv' DELIMITER ',' CSV HEADER;
COPY documents FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_documents.csv' DELIMITER ',' CSV HEADER;
COPY notes FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_notes.csv' DELIMITER ',' CSV HEADER;
COPY job_postings FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_job_postings.csv' DELIMITER ',' CSV HEADER;
COPY blog FROM '/Users/curtiscastro/JobSiteAPI/database/jobsite_test_data/_blog.csv' DELIMITER ',' CSV HEADER;