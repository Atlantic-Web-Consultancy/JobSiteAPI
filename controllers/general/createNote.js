const Model = require('../../model/');

const createNote = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.createNote(data, (err, data) => {
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

module.exports = createNote;