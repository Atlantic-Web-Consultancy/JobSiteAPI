const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getJobs = (params, callback) => {
  let queryValues = [];
  let paramStrings = [];
  let varCounter = 0;
  if (params.employmentTitle) {
    varCounter += 1;
    paramStrings.push(`title LIKE $${varCounter}`);
    queryValues.push(params.employmentTitle);
  }
  if (params.employmentType) {
    varCounter += 1;
    paramStrings.push(`employment_type=$${varCounter}`);
    queryValues.push(params.employmentType);
  }
  if (params.experienceLevel) {
    varCounter += 1;
    paramStrings.push(`experience_level=$${varCounter}`);
    queryValues.push(params.experienceLevel);
  }
  if (params.salaryMin) {
    varCounter += 1;
    paramStrings.push(`salary > $${varCounter}`);
    queryValues.push(params.salaryMin);
  }
  if (params.salaryMax) {
    varCounter += 1;
    paramStrings.push(`salary < $${varCounter}`);
    queryValues.push(params.salaryMax);
  }
  if (params.remote) {
    varCounter += 1;
    paramStrings.push(`type_work=$${varCounter}`);
    queryValues.push(params.remote);
  }
  allParams = paramStrings.join(' and ');
  var queryString = '';
  if (allParams === '') {
    queryString = 'SELECT * FROM job_postings';
  } else {
    queryString = `SELECT * FROM job_postings WHERE ${allParams}`;
  }
  client.query({
    text: queryString,
    values: queryValues
  })
    .then((data) => {
      callback(null, data.rows);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getJobs;