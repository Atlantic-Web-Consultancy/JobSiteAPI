const Model = require('../../model/');

const getNote = (req, callback) => {
  const cookie = req.cookies.jobsite;
  if (cookie) {
    Model.General.getNote(req, (data) => {
        callback(null, data);
    });
  } else {
    callback('Error: Fields Missing or Data is Invalid');
  }
};

module.exports = getNote;