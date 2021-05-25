const Model = require('../../model/');

const getNote = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.getNote(data, (err, data) => {
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

module.exports = getNote;