const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getNote = (data, callback) => {
  const cookie = [ data.cookies.jobsite ];
  const userIdQueryStr = 'SELECT user_id FROM session WHERE cookie=($1)';
  const userIdQuery = {
    text: userIdQueryStr,
    values: cookie
  };
  client.query(userIdQuery)
    .then((sessionData) => {
      const id = [ sessionData.rows[0].user_id ];
      const getNoteQueryStr = 'SELECT job_id, content FROM notes WHERE user_id=($1)';
      const getNoteQuery = {
        text: getNoteQueryStr,
        values: id,
      };
      return client.query(getNoteQuery);
    })
    .then((notes) => {
      callback(notes.rows);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getNote;
