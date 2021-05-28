const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getDocument = (id, callback) => {
  const documentQuery = {
    text: 'SELECT * FROM documents WHERE id=$1',
    values: [id]
  };
  client.query(documentQuery)
    .then((data) => {
      callback(null, data.rows[0]);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getDocument;