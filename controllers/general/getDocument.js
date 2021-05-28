const Model = require('../../model/');

const getDocument = (req, callback) => {
  Model.General.getDocument(req.query.id, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = getDocument;