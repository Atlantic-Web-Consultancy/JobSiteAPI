const Model = require('../../model/');

const getEmployer = (data, callback) => {
  if (Object.keys(data).length === 7) {
    Model.Employer.getEmployer(data, (err) => {
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

module.exports = getEmployer;