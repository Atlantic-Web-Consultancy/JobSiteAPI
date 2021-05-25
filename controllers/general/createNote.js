const Model = require('../../model/');

const createNote = (data, callback) => {
  if (Object.keys(data.body).length === 2) {
    Model.General.createNote(data, (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  } else {
    callback('');
  }
};

module.exports = createNote;