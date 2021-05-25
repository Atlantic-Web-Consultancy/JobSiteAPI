const Model = require('../../model/');

const getSeeker = (req, callback) => {
  var jobSiteCookie = req.cookies.jobsite;
  if (jobSiteCookie) {
    Model.Seeker.getSeeker(jobSiteCookie, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('Job seeker must be logged in to /GET seeker information.');
  }
};

module.exports = getSeeker;