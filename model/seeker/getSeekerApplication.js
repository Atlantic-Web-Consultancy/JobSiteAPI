const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');

getSeekerApplication = (cookie, callback) => {
  const sessionQueryString = `SELECT user_id FROM session WHERE cookie = $1`;
  const sessionQueryValues = [cookie];
  const sessionQuery = {
    text: sessionQueryString,
    values: sessionQueryValues
  }
  client.query(sessionQuery)
  .then((sessionData) => {
    const userId = sessionData.rows[0].user_id;
    if (isNaN(userId)) {
      throw('Invalid user_id, something went wrong.');
    }
    const applicationsQueryString = `SELECT * FROM applications WHERE applicant_id = $1`;
    const applicationsQueryValues = [userId];
    const applicationsQuery = {
      text: applicationsQueryString,
      values: applicationsQueryValues
    }
    return client.query(applicationsQuery)
  })
  .then((applicationsData) => {
    console.log(applicationsData.rows);

    //
    //
    //
    // iterate through applications data
    // push every resume and cover letter id to documents array
    // query documents db for every id in documents array
    const documentsQueryString = `SELECT * FROM documents WHERE id = ANY(ARRAY$1)`;
    const documentIds = [];
    for (let i = 0; i < applicationsData.length; i++) {
      documentIds.push(applicationsData[i].cover);
      documentIds.push(applicationsData[i].resume);
    };
    documentsQuery = {
      text: documentsQueryString,
      values: [documentIds]
    };
    return client.query(documentsQuery);
  })
  .then((documentsData) => {
    // put applications data and documents data into response data object
    const docsAndAppsObject = {
      applications: applicationsData.rows,
      documents: documentsData.rows
    };
    //
    //
    //
    //
    //

    console.log('docsAndAppsObject', docsAndAppsObject);
    callback(null, docsAndAppsObject);
  })
  .catch((err) => {
    callback(err);
  })
};

module.exports = getSeekerApplication;
