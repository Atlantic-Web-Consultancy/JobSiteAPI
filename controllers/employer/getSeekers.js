const Model = require('../../model/');

const getSeekers = (data, callback) => {
  if (Object.keys(data).length === 7) {
    Model.Employer.getSeekers(data, (err) => {
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

module.exports = getSeekers;