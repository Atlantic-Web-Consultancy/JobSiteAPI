const Model = require('../../model/');

const changeEmployer = (data, callback) => {
  if (Object.keys(data).length === 7) {
    Model.Employer.changeEmployer(data, (err) => {
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

module.exports = changeEmployer;