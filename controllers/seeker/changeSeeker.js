const Model = require('../../model/');

const changeSeeker = (data, callback) => {
  if (Object.keys(data).length === 7) {
    Model.Employer.changeSeeker(data, (err) => {
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

module.exports = changeSeeker;