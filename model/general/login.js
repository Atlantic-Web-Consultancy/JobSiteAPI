const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const login = (data, callback) => {
  let user_id;
  const { username, password } = data;
  const authQueryString = `SELECT * FROM auth WHERE username = $1`
  const authValues = [username];
  const authQuery = {
    text: authQueryString,
    values: authValues
  }
  client.query(authQuery)
  .then((authData) => {
    user_id = authData.rows[0].id;
    const userData = authData.rows[0];
    const hashedPassword = utils.createHash(password, userData.salt);
    return hashedPassword === userData.password;
  })
  .then(() => {
    const randomData = utils.createRandom32String();
    const cookie = utils.createHash(randomData);
    const sessionQueryString = `INSERT INTO session (user_id, cookie) VALUES ($1, $2) RETURNING cookie`;
    const sessionValues = [user_id, cookie];
    const sessionQuery = {
      text: sessionQueryString,
      values: sessionValues
    }
    return client.query(sessionQuery)
  })
  .then((sessionData) => {
    const cookie = sessionData.rows[0].cookie;
    callback(null, cookie);
  })
  .catch((err) => {
    callback(err);
  })

}

module.exports = login;