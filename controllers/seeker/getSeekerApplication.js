const Model = require('../../model/');

const getSeekerApplication = (data, callback) => {
  if (Object.keys(data).length === 14) {
    Model.Seeker.getSeekerApplication(data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  } else {
    callback('');
  }
};

module.exports = getSeekerApplication;