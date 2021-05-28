const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

getEmployerPostings = (cookie, callback) => {

  const sessionQueryString = 'SELECT user_id FROM session WHERE cookie = $1';
  const sessionQueryValues = [cookie];
  const sessionQuery = {
    text: sessionQueryString,
    values: sessionQueryValues
  };
  client.query(sessionQuery)
    .then((sessionData) => {
      const userId = sessionData.rows[0].user_id;
      if (isNaN(userId)) {
        throw ('Invalid user_id, something went wrong.');
      }
      const postingsQueryString = 'SELECT * FROM job_postings WHERE employer_id = $1';
      const postingsQueryValues = [userId];
      const postingsQuery = {
        text: postingsQueryString,
        values: postingsQueryValues
      };
      return client.query(postingsQuery);
    })
    .then((postingsData) => {
      callback(null, postingsData.rows);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getEmployerPostings;
