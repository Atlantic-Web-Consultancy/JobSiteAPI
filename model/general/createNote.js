const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const createNote = (data, callback) => {
  const cookie = [ data.cookies.jobsite ];
  if (cookie[0]) {
    const userIdQueryStr = 'SELECT user_id FROM session WHERE cookie=($1)';
    const userIdQuery = {
      text: userIdQueryStr,
      values: cookie,
    }
    client.query(userIdQuery)
      .then((sessionData) => {
        const addNoteQueryStr = 'INSERT INTO notes(user_id, job_id, content) VALUES ($1, $2, $3)';
        const addNoteValues = [
          sessionData.rows[0].user_id,
          data.body.job_id,
          data.body.content
        ]
        const addNoteQuery = {
          text: addNoteQueryStr,
          values: addNoteValues
        };
        return client.query(addNoteQuery);
      })
      .then(callback(null))
      .catch((err) => {
        callback(err);
      });
  } else {
    callback('Error: No Cookie Present');
  }
};

module.exports = createNote;
