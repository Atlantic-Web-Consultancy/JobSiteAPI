const Model = require('../../model/');

const getNote = (req, callback) => {
  if (req.cookies) {
    Model.General.getNote(req, (data) => {
        callback(null, data);
    });
  } else {
    callback('');
  }
};

module.exports = getNote;