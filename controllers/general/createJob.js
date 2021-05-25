const Model = require('../../model/');

const createJob = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.createJob(data, (err, data) => {
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

module.exports = createJob;