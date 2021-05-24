const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const logout = (cookie, callback) => {
  // select from session where cookie - qcookie
  const sessionQueryString = `DELETE FROM session WHERE cookie = $1`
  const sessionValues = [cookie];
  const sessionQuery = {
    text: sessionQueryString,
    values: sessionValues
  }
  client.query(sessionQuery)
  .then(() => callback(null))
  .catch((err) => callback(err));
}

module.exports = logout;