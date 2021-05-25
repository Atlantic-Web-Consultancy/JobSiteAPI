const Model = require('../../model/');

const getEmployerPostings = (data, callback) => {
  if (Object.keys(data).length === 7) {
    Model.Employer.getEmployerPostings(data, (err) => {
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

module.exports = getEmployerPostings;