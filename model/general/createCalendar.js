const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const createCalendar = (data, callback) => {
  const userIdQueryStr = `SELECT user_id FROM session WHERE cookie='${data.cookies.jobsite}'`;
  client.query(userIdQueryStr)
    .then((sessionData) => {
      const addCalQueryStr = 'INSERT INTO calendar_events(user_id, event_name, start_time, end_time, location) VALUES ($1, $2, $3, $4, $5) RETURNING user_id';
      const addCalValues = [
        sessionData.rows[0].user_id,
        data.body.event_name,
        data.body.start_time,
        data.body.end_time,
        data.body.location,
      ]
      const addCalQuery = {
        text: addCalQueryStr,
        values: addCalValues
      };
      return client.query(addCalQuery)
    })
    .then(()=>{console.log('success!!!');callback(null)})
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

module.exports = createCalendar;