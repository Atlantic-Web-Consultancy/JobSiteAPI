const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const updateApplication = (data, cookie, callback) => {
  isNaN(data.resume) ? data.resume = null : data.resume;
  isNaN(data.cover) ? data.cover = null : data.cover;
  const sessionQuery = {
    text: 'SELECT user_id FROM session WHERE cookie = $1',
    values: [cookie]
  };
  client.query(sessionQuery)
    .then((sessionQueryData) => {
      const userId = sessionQueryData.rows[0].user_id;
      const applicationUpdateQueryString = 'UPDATE applications SET resume = $1, cover = $2, submission_date = $3, interest_level = $4, status = $5 WHERE applicant_id = $6 AND job_id = $7';
      const applicationUpdateQuery = {
        text: applicationUpdateQueryString,
        values: [data.resume, data.cover, data.submissionDate, data.interestLevel, data.status, userId, data.jobId]
      };
      return client.query(applicationUpdateQuery);
    })
    .then((applicationUpdateData) => {
      console.log(applicationUpdateData);
      if (applicationUpdateData.rowCount === 0) {
        throw ('Error: Could not find application to update');
      } else {
        callback(null);
      }
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = updateApplication;