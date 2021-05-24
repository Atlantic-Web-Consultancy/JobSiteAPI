const Model = require('../../model/');

const login = (data, callback) => {
  if (Object.keys(data).length === 2) {
    Model.General.login(data, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback('Invalid credentials');
  }
}

module.exports = login;