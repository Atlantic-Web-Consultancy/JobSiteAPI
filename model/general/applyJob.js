const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const applyJob = (data, cookie, callback) => {
  const sessionQuery = {
    text: 'SELECT user_id FROM session WHERE cookie = $1',
    values: [cookie]
  };
  client.query(sessionQuery)
    .then((sessionQueryData) => {
      const userId = sessionQueryData.rows[0].user_id;
      const applicationQuery = {
        text: 'INSERT INTO applications (job_id, applicant_id, resume, cover, submission_date, interest_level, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        values: [data.jobId, userId, data.resume, data.cover, data.submissionDate, data.interestLevel, data.status]
      };
      return client.query(applicationQuery);
    })
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = applyJob;