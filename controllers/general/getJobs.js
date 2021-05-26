const Model = require('../../model/');

const getJobs = (req, callback) => {
  // not validating cookies - can search jobs as anonymous user
  // could validate params here - depends on what we wanna do with incomplete query params

  //
  // ZIP CODE API???
  //
  const zipCodes = [];
  // zipcodes.push - zipcodes within specified distance?

  Model.General.getJobs(req.query, zipCodes, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = getJobs;