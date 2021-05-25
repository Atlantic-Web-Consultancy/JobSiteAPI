const login = require('./login.js');
const logout = require('./logout.js');


const General = {
  login,
  logout,
  createNote,
  getNote,
  createCalendar,
  getCalendar,
  getJobs,
  createJob,
  applyJob
};

module.exports = General;