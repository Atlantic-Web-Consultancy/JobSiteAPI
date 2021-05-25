const Model = require('../../model/');

const applyJob = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.applyJob(data, (err, data) => {
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

module.exports = applyJob;