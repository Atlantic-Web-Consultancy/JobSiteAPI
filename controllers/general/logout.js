const Model = require('../../model/');

const logout = (data, callback) => {
  if (data.cookies.jobsite) {
    Model.General.logout(data.cookies.jobsite, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  } else {
    callback('No cookie present, cannot logout');
  }
}

module.exports = logout;