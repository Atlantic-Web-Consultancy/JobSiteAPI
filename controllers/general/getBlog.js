const Model = require('../../model/');

const getBlog = (req, callback) => {
  Model.General.getBlog(req, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = getBlog;