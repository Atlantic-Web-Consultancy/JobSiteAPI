const Model = require('../../model/');

const getEmployer = (req, callback) => {
  var jobSiteCookie = req.cookies.jobsite;
  if (jobSiteCookie) {
    Model.Employer.getEmployer(jobSiteCookie, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('Employer must be logged in to GET employer information.');
  }
};

module.exports = getEmployer;