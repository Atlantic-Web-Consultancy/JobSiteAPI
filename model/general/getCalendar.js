const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getCalendar = (data, callback) => {
  const userIdQueryStr = 'SELECT user_id FROM session WHERE cookie=($1)';
  const cookie = [ data.cookies.jobsite ];
  const userIdQuery = {
    text: userIdQueryStr,
    values: cookie,
  };
  client.query(userIdQuery)
    .then((sessionData) => {
      const getCalQueryStr = 'SELECT * FROM calendar_events WHERE user_id=($1)';
      const userId = [ sessionData.rows[0].user_id ];
      const getCalQuery = {
        text: getCalQueryStr,
        values: userId,
      };
      return client.query(getCalQuery);
    })
    .then((cal) => {
      callback(cal.rows);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getCalendar;