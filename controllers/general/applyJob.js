const Model = require('../../model/');

const applyJob = (req, callback) => {
  var data = req.body;
  // NOTES: this is to create a new SAVED JOB - not necessarily APPLIED TO

  if (req.cookies.jobsite) {
    if (Object.keys(data).length === 6) {
      Model.General.applyJob(data, req.cookies.jobsite, (err, data) => {
        if (err) {
          callback(err);
        } else {
          callback(null, data);
        }
      });
    } else {
      callback('Error: incorrect number of fields.');
    }
  } else {
    callback('Error: must be logged in to apply to job.');
  }


};

module.exports = applyJob;