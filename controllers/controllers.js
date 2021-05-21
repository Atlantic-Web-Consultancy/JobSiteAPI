// const Model = require('../model/model.js');

const User = {
  getUser: (userId, callback) => {
    Model.getUserProfile(userId, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  createUser: (data, callback) => {  // PARSE DATA
    Model.createUserProfile(data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  updateNotes: (userId, data, callback) => { // PARSE DATA
    Model.updateNotes(userId, data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  getNotes: (userId, callback) => {
    Model.getNotes(userId, (err, notes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, notes);
      }
    });
  },
  getCalendar: (userId, params, callback) => {
    var page = params.page;
    var count = params.count;
    Model.getCalendar(userId, page, count, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  getUserApplications: (userId, params, callback) => {
    var page = query.page;
    var count = params.count;
    var sort = params.sort;
    Model.getOwnApplications(userId, page, count, sort, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  createApplicant: (data, callback) => {
    Model.createApplicant(data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  searchJobs: (params, callback) => {
    var minSalary = params.salary1;
    var maxSalary = params.salary2;
    // going to have to figure out how we can determine distance
    // whatever else we need
    Model.searchJobs(/*data,*/(err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
};

const Employer = {
  getEmployer: (userId, callback) => {
    Model.getEmployer(id, (err, data) =>{
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  createEmployer: (data, callback) => { // PARSE DATA
    Model.createEmployerProfile(data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  retrievePostings: (userId, callback) => {
    Model.getPostedJobs(userId, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  updateNotes: (userId, data, callback) => { // PARSE DATA
    Model.updateNotes(userId, data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  getNotes: (userId, callback) => {
    Model.getEmployerNotes(userId, (err, notes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, notes);
      }
    });
  },
  getCalendar: (userId, params, callback) => {
    var page = params.page;
    var count = params.count;
    Model.getCalendar(userId, page, count, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  retrieveApplicantsForJob: (jobId, params, callback) => {
    var page = params.page;
    var count = params.count;
    var keywords = params.keyword.split('+'); // idk this might not work
    Model.retrieveApplicantsForJob(jobId, page, count, keywords, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  createJobPosting: (data, callback) => { // PARSE DATA
    Model.createJobPosting(data, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }
};


module.exports = {
  User,
  Employer
};

