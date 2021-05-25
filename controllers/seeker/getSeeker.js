const Model = require('../../model/');

const getSeeker = (data, callback) => {
  if (Object.keys(data).length === 14) {
    Model.Seeker.getSeeker(data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  } else {
    callback('');
  }
};

module.exports = getSeeker;