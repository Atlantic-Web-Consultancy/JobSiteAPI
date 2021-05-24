const Model = require('../model/model.js');


const Seeker = {
  getUser: (userId, callback) => {
    Model.getUserProfile(userId, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  // createSeeker: (data, callback) => {
  //   if (Object.keys(data).length === 14) {
  //     Model.Seeker.createSeeker(data, (err) => {
  //       if (err) {
  //         callback(err);
  //       } else {
  //         callback(null);
  //       }
  //     });
  //   } else {
  //     callback('Invalid submission');
  //   }

  // },
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
  createEmployer: (data, callback) => {
    if (Object.keys(data).length === 7) {
      Model.Employer.createEmployer(data, (err) => {
        if (err) {
          console.log('callbackerr');
          callback(err);
        } else {
          console.log('callbacknull')
          callback(null);
        }
      });
    } else {
      callback('Invalid submission');
    }
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
  Seeker,
  Employer
};
