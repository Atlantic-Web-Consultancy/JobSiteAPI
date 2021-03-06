const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

createSeeker = (data, callback) => {
  const salt = utils.createRandom32String();
  const hashedPassword = utils.createHash(data.password, salt);
  const authQueryString = 'INSERT INTO auth (username, pwhash, salt, type) VALUES ($1, $2, $3, \'seeker\') RETURNING id';
  const authValues = [
    data.username,
    hashedPassword,
    salt
  ];
  const authQuery = {
    text: authQueryString,
    values: authValues
  };
  client.query(authQuery)
    .then((authData) => {
      const seekerQueryString = 'INSERT INTO applicants (id, username, first_name, last_name, address1, address2, city, state, country, zip, phone, email, dob, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
      const seekerValues = [
        authData.rows[0].id,
        data.username,
        data.first_name,
        data.last_name,
        data.address1,
        data.address2,
        data.city,
        data.state,
        data.country,
        data.zip,
        data.phone,
        data.email,
        data.dob,
        data.gender
      ];
      const seekerQuery = {
        text: seekerQueryString,
        values: seekerValues
      };
      return client.query(seekerQuery);
    })
    .then(callback(null))
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

module.exports = createSeeker;