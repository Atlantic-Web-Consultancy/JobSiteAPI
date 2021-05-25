const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getNote = (data, callback) => {
  const userIdQueryStr = `SELECT user_id FROM session WHERE cookie='${data.cookies.jobsite}'`;
  client.query(userIdQueryStr)
  .then((sessionData) => {
    const getNoteQueryStr = `SELECT job_id, content FROM notes WHERE user_id=${sessionData.rows[0].user_id}`;
    console.log(getNoteQueryStr);
    return client.query(getNoteQueryStr);
  })
  .then((notes) => {
    console.log(notes.rows);
    callback(notes.rows)
  })
  .catch((err) => {
    console.log(err);
    callback(err);
  });
};

module.exports = getNote;