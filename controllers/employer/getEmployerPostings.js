const Model = require('../../model/');

const getEmployerPostings = (req, callback) => {
  var jobSiteCookie = req.cookies.jobsite;
  if (jobSiteCookie) {
    Model.Employer.getEmployerPostings(jobSiteCookie, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('Employer must be logged in to GET posted jobs.');
  }
};

module.exports = getEmployerPostings;
