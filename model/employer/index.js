const createEmployer = require('./createEmployer.js');
const getEmployer = require('./getEmployer.js');
const changeEmployer = require('./changeEmployer.js');
const getEmployerPostings = require('./getEmployerPostings.js');
const getSeekers = require('./getSeekers.js');


const Employer = {
  createEmployer,
  getEmployer,
  changeEmployer,
  getEmployerPostings,
  getSeekers
};

module.exports = Employer;