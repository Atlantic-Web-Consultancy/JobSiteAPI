const Model = require('../../model/');

const createCalendar = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.createCalendar(data, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('');
  }
};

module.exports = createCalendar;