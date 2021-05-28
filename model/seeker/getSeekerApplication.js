const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

getSeekerApplication = (cookie, callback) => {
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
      const applicationsQueryString = 'SELECT * FROM applications WHERE applicant_id = $1';
      const applicationsQueryValues = [userId];
      const applicationsQuery = {
        text: applicationsQueryString,
        values: applicationsQueryValues
      };
      return client.query(applicationsQuery);
    })
    .then((applicationsData) => {
      callback(null, applicationsData.rows);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getSeekerApplication;
