const Model = require('../../model/');

const getCalendar = (req, callback) => {
  if (req.cookies) {
    Model.General.getCalendar(req, (data) => {
        callback(null, data);
     });
  } else {
    callback('');
  }
};

module.exports = getCalendar;