const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

getSeeker = (cookie, callback) => {
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
      const applicantQueryString = 'SELECT * FROM applicants WHERE id = $1';
      const applicantQueryValues = [userId];
      const applicantQuery = {
        text: applicantQueryString,
        values: applicantQueryValues
      };
      return client.query(applicantQuery);
    })
    .then((applicantData) => {
      callback(null, applicantData.rows[0]);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getSeeker;