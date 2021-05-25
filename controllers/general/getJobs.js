const Model = require('../../model/');

const getJobs = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.getJobs(data, (err, data) => {
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

module.exports = getJobs;