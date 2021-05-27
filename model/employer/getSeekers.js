const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

getSeekers = (cookie, jobId, queryParams, callback) => {
  authenticateSeekers(cookie, jobId, queryParams, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};


const authenticateSeekers = (cookie, jobId, queryParams, callback) => {
  const sessionQueryString = 'SELECT user_id FROM session WHERE cookie = $1';
  const sessionQueryValues = [cookie];
  const sessionQuery = {
    text: sessionQueryString,
    values: sessionQueryValues
  };
  client.query(sessionQuery)
    .then((sessionData) => {
      const userId = sessionData.rows[0].user_id;
      const authenticateJob = {
        text: 'SELECT id FROM job_postings WHERE employer_id = $1',
        values: [userId]
      };
      return client.query(authenticateJob);
    })
    .then((jobData) => {
      if (jobData.rows[0].id === parseInt(jobId)) {
        fetchSeekers(jobId, queryParams, callback);
      } else {
        callback('Error: This user is not authenticated to view applicants for this job posting.');
      }
    });
};

const fetchSeekers = (jobId, queryParams, callback) => {
  let applicantQueryString = 'SELECT applications.applicant_id, applications.resume, applications.cover, applications.submission_date, documents.text, applicants.first_name, applicants.last_name, applicants.phone, applicants.email, applicants.dob, applicants.gender FROM applications applications INNER JOIN documents documents ON documents.id = applications.resume INNER JOIN applicants applicants ON applicants.id = applications.applicant_id WHERE job_id = $1';
  const applicantValues = [jobId];
  const applicantQuery = {
    text: applicantQueryString,
    values: applicantValues
  };
  client.query(applicantQuery)
    .then((data) => {
      if (queryParams.filter) {
        filterData(data.rows, queryParams.filter, callback);
      } else {
        const cleanedData = parseData(data.rows);
        callback(null, cleanedData);
      }
    })
    .catch((err) => {
      callback(err);
    });
};

const filterData = (applications, filter, callback) => {
  const filteredApplications = [];
  for (let i = 0; i < applications.length; i++) {
    if (applications[i].text.toLowerCase().includes(filter.toLowerCase())) {
      filteredApplications.push(applications[i]);
    }
  }
  callback(null, filteredApplications);
};

module.exports = getSeekers;