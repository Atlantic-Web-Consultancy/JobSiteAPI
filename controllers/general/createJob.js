const Model = require('../../model/');

const createJob = (req, callback) => {
  if (Object.keys(req.body).length === 7) {
    if (req.cookies.jobsite) {
      Model.General.createJob(req.body, req.cookies.jobsite, (err, data) => {
        if (err) {
          callback(err);
        } else {
          callback(null, data);
        }
      });
    } else {
      callback('No cookie present');
    }
  } else {
    callback('Could not create Job, some fields are missing');
  }
};

module.exports = createJob;