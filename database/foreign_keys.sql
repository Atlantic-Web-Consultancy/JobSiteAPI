-- ---
-- Foreign Keys
-- ---

ALTER TABLE session ADD INDEX session_user(user_id)

ALTER TABLE applicants ADD INDEX applicants_user (id)

ALTER TABLE employers ADD INDEX employers_user (id)

ALTER TABLE calendar_events ADD INDEX calendar_user (user_id);

ALTER TABLE applications ADD INDEX applications_user (applicant_id);

ALTER TABLE applications ADD INDEX applications_job (job_id);

ALTER TABLE applications ADD FOREIGN KEY (resume) REFERENCES documents (id);

ALTER TABLE notes ADD INDEX notes_user (user_id);

ALTER TABLE notes ADD INDEX notes_job (job_id);

ALTER TABLE job_postings ADD INDEX postings_employer (employer_id);