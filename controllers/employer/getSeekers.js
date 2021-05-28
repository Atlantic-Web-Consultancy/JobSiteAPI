const Model = require('../../model/');

getSeekers = (req, callback) => {
  var jobSiteCookie = req.cookies.jobsite;
  if (jobSiteCookie) {
    Model.Employer.getSeekers(jobSiteCookie, req.params.jobId, req.query, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('Employer must be logged in to GET applicants for a job posting.');
  }
};

module.exports = getSeekers;