const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const createNote = (data, callback) => {
  const userIdQueryStr = `SELECT user_id FROM session WHERE cookie='${data.cookies.jobsite}'`;
  client.query(userIdQueryStr)
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
      console.log(err);
      callback(err);
    });
};

module.exports = createNote;