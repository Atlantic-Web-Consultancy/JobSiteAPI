const Model = require('../../model/');

const createSeeker = (data, callback) => {
  if (Object.keys(data).length === 14) {
    Model.Seeker.createSeeker(data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  } else {
    callback('Invalid submission');
  }

}

module.exports = createSeeker;