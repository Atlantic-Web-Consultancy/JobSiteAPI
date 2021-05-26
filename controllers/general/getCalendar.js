const Model = require('../../model/');

const getCalendar = (req, callback) => {
  const cookie = req.cookies.jobsite;
  if (cookie) {
    Model.General.getCalendar(req, (data) => {
      callback(null, data);
    });
  } else {
    callback('Error: Fields Missing or Data is Invalid');
  }
};

module.exports = getCalendar;