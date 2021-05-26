const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getJobs = (params, zipsInRange, callback) => {

  // parse query params here
  // combine all this into one query? - could also sort through results but may be inefficient
  const values = [];
  const employmentTypeQuery = `SELECT * FROM job_postings WHERE title LIKE $1, OR title LIKE $2, OR title LIKE $3`;
  const xpLevelQuery = `SELECT * FROM job_postings WHERE experience_level = $4`;
  const salaryQuery = `SELECT * FROM job_postings WHERE salary > $5 AND salary < $6`;
  const remoteQuery = `SELECT * FROM job_postings WHERE type_work = $7`;
  const dateQuery = `SELECT * FROM job_postings WHERE date_posted > $8`; // NOTE THIS ISNT SORTING IN ASCENDING/DESC
  const locationQuery = `SELECT * FROM job_postings WHERE location IN (zipsInRange)`;

  // do query
  // THEN
  // send to user?

};

module.exports = getJobs;