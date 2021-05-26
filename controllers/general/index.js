const login = require('./login.js');
const logout = require('./logout.js');
const createNote = require('./createNote.js');
const getNote = require('./getNote.js');
const createCalendar = require('./createCalendar.js');
const getCalendar = require('./getCalendar.js');
const getJobs = require('./getJobs.js');
const createJob = require('./createJob.js');
const applyJob = require('./applyJob.js');
const createDocument = require('./createDocument.js');

const General = {
  login,
  logout,
  createNote,
  getNote,
  createCalendar,
  getCalendar,
  getJobs,
  createJob,
  applyJob,
  createDocument
};

module.exports = General;