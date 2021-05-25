const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

getEmployer = (cookie, callback) => {
  const sessionQueryString = `SELECT user_id FROM session WHERE cookie = $1`;
  const sessionQueryValues = [cookie];
  const sessionQuery = {
    text: sessionQueryString,
    values: sessionQueryValues
  }
  client.query(sessionQuery)
  .then((sessionData) => {
    const userId = sessionData.rows[0].user_id;
    if (isNaN(userId)) {
      throw('Invalid user_id, something went wrong.');
    }
    const employerQueryString = `SELECT * FROM employers WHERE id = $1`;
    const employerQueryValues = [userId];
    const employerQuery = {
      text: employerQueryString,
      values: employerQueryValues
    }
    return client.query(employerQuery)
  })
  .then((employerData) => {
    callback(null, employerData.rows[0]);
  })
  .catch((err) => {
    callback(err);
  })
};

module.exports = getEmployer;