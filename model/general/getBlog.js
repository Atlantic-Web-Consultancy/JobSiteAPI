const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

const getBlog = (data, callback) => {
  const blogQuery = {
    text: 'SELECT * FROM blog',
    values: [],
  };
  client.query(blogQuery)
    .then((blogPosts) => {
      callback(null, blogPosts.rows);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getBlog;