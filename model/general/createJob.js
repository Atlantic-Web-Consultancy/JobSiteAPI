const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const createJob = (body, cookie, callback) => {
  const sessionQuery = {
    text: 'SELECT user_id FROM session WHERE cookie = $1',
    values: [cookie]
  };
  client.query(sessionQuery)
    .then((sessionQueryData) => {
      const userId = sessionQueryData.rows[0].user_id;
      const jobPostingQuery = {
        text: 'INSERT INTO job_postings (title, description, employer_id, employment_type, experience_level, salary, type_work, date_posted, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [body.title, body.description, userId, body.employment_type, body.experience_level, body.salary, body.type_work, Date.now(), body.location]
      };
      return client.query(jobPostingQuery);
    })
    .then((jobPostingQueryData) => {
      callback(null);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

module.exports = createJob;