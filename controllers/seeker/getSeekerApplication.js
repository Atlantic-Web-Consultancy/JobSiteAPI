const Model = require('../../model/');

const getSeekerApplication = (req, callback) => {
  var jobSiteCookie = req.cookies.jobsite;
  if (jobSiteCookie) {
    Model.Seeker.getSeekerApplication(jobSiteCookie, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('Job seeker must be logged in to GET their job applications.');
  }
};

module.exports = getSeekerApplication;