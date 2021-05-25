const Model = require('../../model/');

const getCalendar = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.getCalendar(data, (err, data) => {
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

module.exports = getCalendar;