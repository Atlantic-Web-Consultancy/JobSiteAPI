const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const createEmployer = (data, callback) => {
  const salt = utils.createRandom32String();
  const hashedPassword = utils.createHash(data.password, salt);
  const authQueryString = `INSERT INTO auth (username, pwhash, salt, type) VALUES ($1, $2, $3, 'employer') RETURNING id`;
  const authValues = [
    data.username,
    hashedPassword,
    salt
  ]
  const authQuery = {
    text: authQueryString,
    values: authValues
  }
  client.query(authQuery)
    .then((authData) => {
      const employerQueryString = `INSERT INTO employers (id, username, first_name, last_name, email, phone, organization) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const employerValues = [
        authData.rows[0].id,
        data.username,
        data.first_name,
        data.last_name,
        data.email,
        data.phone,
        data.organization
      ];
      const employerQuery = {
        text: employerQueryString,
        values: employerValues
      }
      return client.query(employerQuery);
    })
    .then(() => callback(null))
    .catch((err) => {
      callback(err);
    });
}

module.exports = createEmployer;