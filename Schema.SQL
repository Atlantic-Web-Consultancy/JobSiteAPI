-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Authorization--
-- ---

DROP TABLE IF EXISTS authorization;

CREATE TABLE authorization (
  id SERIAL,
  username VARCHAR(20),
  pwhash VARCHAR(24),
  salt VARCHAR(20),
  type VARCHAR(10),
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
  cookie VARCHAR(20),
  PRIMARY KEY (id)
);

-- ---
-- Table 'applicants'
--
-- ---

DROP TABLE IF EXISTS applicants;

CREATE TABLE applicants (
  id INTEGER,
  username VARCHAR(20),
  first_name TEXT,
  last_name TEXT,
  address1 TEXT,
  address2 TEXT NULL,
  city TEXT,
  state VARCHAR(2),
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
  username VARCHAR(20),
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
  location INTEGER,
  PRIMARY KEY(id)
);



-- ---
-- Indexes
-- ---
-- DROP INDEX IF EXISTS photo_id_index;
-- DROP INDEX IF EXISTS answer_id_index;
-- DROP INDEX IF EXISTS question_id_index;

CREATE INDEX CONCURRENTLY photo_id_index ON photos USING HASH (photo_id);
CREATE INDEX CONCURRENTLY answer_id_index ON answers USING HASH (answer_id);
CREATE INDEX CONCURRENTLY question_id_index ON questions USING HASH (question_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO Product (product_id,name,slogan,description,category,default_price) VALUES
(1,'Dope Hoodie','Even doper now','simply the dopest','hoodies',3000);
INSERT INTO Questions (product_id,question_id,body,date_written,asker_name,asker_email,reported,helpful) VALUES
(1,1,'question?',1599958385988,'seller','seller@email.com',0,3);
INSERT INTO Answers (question_id,answer_id,body,date,answerer_name,answerer_email,reported,helpfulness) VALUES
(1,1,'hey this is an answer',1599958385988,'johnnyB','jb@email.com',0,5);
INSERT INTO Photos (answer_id,photo_id,url) VALUES
(1,1,'radical_photo_url');

-- ---
-- INITIALIZE SERIALIZATION
-- ---

SELECT setval(pg_get_serial_sequence('questions', 'question_id'), coalesce(max(question_id)+1, 1), false) FROM questions;
SELECT setval(pg_get_serial_sequence('answers', 'answer_id'), coalesce(max(answer_id)+1, 1), false) FROM answers;
SELECT setval(pg_get_serial_sequence('photos', 'photo_id'), coalesce(max(photo_id)+1, 1), false) FROM photos;

-- ---
-- SEED DATA
-- ---

-- COPY product FROM '/Users/curtiscastro/work/Projects/SDC-team-4/QA/product.csv' DELIMITER ',' CSV HEADER;
-- COPY questions FROM '/Users/curtiscastro/work/Projects/SDC-team-4/QA/questions.csv' DELIMITER ',' CSV HEADER;
-- COPY answers FROM '/Users/curtiscastro/work/Projects/SDC-team-4/QA/answers.csv' DELIMITER ',' CSV HEADER;
-- COPY photos FROM '/Users/curtiscastro/work/Projects/SDC-team-4/QA/answers_photos.csv' DELIMITER ',' CSV HEADER;