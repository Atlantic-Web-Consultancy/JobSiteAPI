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
  if (params.distance) {
    const ipAddress = ip.split(':')[3];
    const requestLocateURL = `http://api.ipstack.com/${ipAddress}?access_key=33829db1c458b764a5006e3ee05e2339&format=1`;
    axios.get(requestLocateURL)
      .then((location) => {
        const zip = location.data.zip;
        const zipRequestURL = `https://www.zipcodeapi.com/rest/DemoOnly00Ohu1ugJZtit01nhbeqkRCnxBgW31AWWDqeEXtpZM2pPFMxwczr7QLz/radius.json/${zip}/${params.distance}/mile`;
        return axios.get(zipRequestURL);
      }
      )
      .then((zipData) => {
        var zipParams = [];
        for (var i = 0; i < zipData.data.zip_codes.length; i++) {
          varCounter += 1;
          zipParams.push(`location=$${varCounter}`);
          queryValues.push(zipData.data.zip_codes[i].zip_code);
        }
        var zipString = zipParams.join(' OR ');
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
    queryString = 'SELECT * FROM job_postings';
  } else {
    queryString = `SELECT * FROM job_postings WHERE ${allParams}`;
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