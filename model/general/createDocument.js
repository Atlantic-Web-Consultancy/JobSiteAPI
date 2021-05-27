const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const createDocument = (originalName, fileName, text, callback) => {
  const documentQuery = {
    text: 'INSERT INTO documents (document_name, document_hash, text) VALUES ($1, $2, $3) RETURNING id',
    values: [originalName, fileName, text]
  };
  client.query(documentQuery)
    .then((data) => {
      callback(null, data.rows[0].id);
    })
    .catch((err) => {
      callback(err);
    });


};

module.exports = createDocument;