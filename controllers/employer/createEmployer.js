const Model = require('../../model/');

const createEmployer = (data, callback) => {
  if (Object.keys(data).length === 7) {
    Model.Employer.createEmployer(data, (err) => {
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

module.exports = createEmployer;