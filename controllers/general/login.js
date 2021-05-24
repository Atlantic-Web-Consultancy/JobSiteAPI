const Model = require('../../model/');

const login = (data, callback) => {
  console.log('controllergenerallogin', data);
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