const client = require('../../database/pg.js');
const utils = require('../../lib/hashUtils.js');
const axios = require('axios');

const getJobs = (params, ip, callback) => {
  let queryValues = [];
  let paramStrings = [];
  let varCounter = 0;
  if (params.employmentTitle) {
    varCounter += 1;
    paramStrings.push(`title LIKE $${varCounter}`);
    const employmentTitle = params.employmentTitle.replace(' ', '%');
    queryValues.push(`%${employmentTitle}%`);
  }
  if (params.employmentType) {
    varCounter += 1;
    paramStrings.push(`employment_type=$${varCounter}`);
    queryValues.push(params.employmentType);
  }
  if (params.experienceLevel) {
    varCounter += 1;
    paramStrings.push(`experience_level=$${varCounter}`);
    queryValues.push(params.experienceLevel);
  }
  if (params.salaryMin) {
    varCounter += 1;
    paramStrings.push(`salary > $${varCounter}`);
    queryValues.push(params.salaryMin);
  }
  if (params.salaryMax) {
    varCounter += 1;
    paramStrings.push(`salary < $${varCounter}`);
    queryValues.push(params.salaryMax);
  }
  if (params.remote) {
    varCounter += 1;
    paramStrings.push(`type_work=$${varCounter}`);
    queryValues.push(params.remote);
  }
  if (params.date) {
    varCounter += 1;
    const date = Date.now() - params.date * 86400000;
    paramStrings.push(`date_posted > $${varCounter}`);
    queryValues.push(date);
  }
  if (params.distance) {
    const ipAddress = ip.split(':')[3];
    const requestLocateURL = `http://api.ipstack.com/${ipAddress}?access_key=33829db1c458b764a5006e3ee05e2339&format=1`;
    axios.get(requestLocateURL)
      .then((location) => {
        const zip = location.data.zip;
        const zipRequestURL = `https://www.zipcodeapi.com/rest/DemoOnly00mfx70owGPj9CN10jlfFP0isyzE85dFlnmPUuTx9qYPsZyswXojtfJR/radius.json/${zip}/${params.distance}/mile`;
        return axios.get(zipRequestURL);
      }
      )
      .then((zipData) => {
        const zipParams = [];
        for (var i = 0; i < zipData.data.zip_codes.length; i++) {
          varCounter += 1;
          zipParams.push(`$${varCounter}`);
          queryValues.push(zipData.data.zip_codes[i].zip_code);
        }
        const zipJoined = zipParams.join(', ');
        var zipString = `location IN (${zipJoined})`;
        paramStrings.push(zipString);
        executeQuery(paramStrings, queryValues, callback);
      });

  } else {
    executeQuery(paramStrings, queryValues, callback);
  }

};

const executeQuery = (paramStrings, queryValues, callback) => {
  allParams = paramStrings.join(' and ');
  var queryString = '';
  if (allParams === '') {
    queryString = 'SELECT * FROM job_postings INNER JOIN employers employers ON employer_id = employers.id ORDER BY date_posted DESC';
  } else {
    queryString = `SELECT * FROM job_postings INNER JOIN employers employers ON employer_id = employers.id WHERE ${allParams} ORDER BY date_posted DESC`;
  }
  client.query({
    text: queryString,
    values: queryValues
  })
    .then((data) => {
      callback(null, data.rows);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = getJobs;