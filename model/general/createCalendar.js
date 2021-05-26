const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const createCalendar = (data, callback) => {
  const cookie = [ data.cookies.jobsite ];
  if (cookie[0]) {
    const userIdQueryStr = `SELECT user_id FROM session WHERE cookie=($1)`;
    const userIdQuery = {
      text: userIdQueryStr,
      values: cookie,
    }
    client.query(userIdQuery)
      .then((sessionData) => {
        const addCalQueryStr = 'INSERT INTO calendar_events(user_id, event_name, start_time, end_time, location) VALUES ($1, $2, $3, $4, $5)';
        const addCalValues = [
          sessionData.rows[0].user_id,
          data.body.event_name,
          data.body.start_time,
          data.body.end_time,
          data.body.location,
        ]
        const addCalQuery = {
          text: addCalQueryStr,
          values: addCalValues,
        };
        return client.query(addCalQuery)
      })
      .then(callback(null))
      .catch((err) => {
        callback(err);
      });
  } else {
    callback('Error: No Cookie Present');
  }
};

module.exports = createCalendar;