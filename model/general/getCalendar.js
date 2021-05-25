const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getCalendar = (data, callback) => {
  const userIdQueryStr = `SELECT user_id FROM session WHERE cookie='${data.cookies.jobsite}'`;
  client.query(userIdQueryStr)
  .then((sessionData) => {
    const getCalQueryStr = `SELECT * FROM calendar_events WHERE user_id=${sessionData.rows[0].user_id}`;
    return client.query(getCalQueryStr);
  })
  .then((cal) => {
    callback(cal.rows)
  })
  .catch((err) => {
    console.log(err);
    callback(err);
  });
};

module.exports = getCalendar;