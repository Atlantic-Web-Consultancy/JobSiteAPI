const Model = require('../../model/');

const updateApplication = (req, callback) => {
  var data = req.body;
  if (req.cookies.jobsite) {
    // this is contingent on the resume/coverletter being NULL if they aren't updated yet.
    if (Object.keys(data).length === 6) {
      Model.General.updateApplication(data, req.cookies.jobsite, (err, data) => {
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
    callback('Error: must be logged in to apply to/save job.');
  }
};

module.exports = updateApplication;