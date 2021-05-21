const userData = {
  id: 30001,
  firstName: 'Grant',
  lastName: 'Schaeffer',
  address1: '3111 Lake Tahoe Way',
  address2: null,
  city: 'Lake Tahoe',
  state: 'NV',
  country: 'USA',
  zip: 27972,
  phone: '1-800-800-8000',
  email: 'grant.schaeffer@hotmail.com',
  dob: '01/01/1987',
  gender: 'male',
  username: 'gschaeffer',
  notes: 'Hi this is Grant. Here are my notes.'
};

const userCalendar = [
  {
    id: 1,
    eventName: 'Meeting with Grandpa',
    time: '2017-05-24 19:30:10',
    duration: 60,
    location: 'Lake Tahoe Starbucks',
    userId: 30001
  },
  {
    id: 2,
    eventName: 'Meeting with Grandma',
    time: '2021-05-25 19:30:10',
    duration: 60,
    location: 'Lake Tahoe Starbucks',
    userId: 30001
  }
];

const jobPostings = [
  {
    id: 9939,
    description: 'Cookie Chef',
    employmentType: 'Full-Time',
    experienceLevel: '3-5 Years',
    salary: 120000,
    remote: 'Onsite',
    datePosted: '2021-05-21 19:30:10',
    location: 90210,
    employerId: 97,
  },
  {
    id: 9941,
    description: 'Sous Chef',
    employmentType: 'Part-Time',
    experienceLevel: '2-6 Years',
    salary: 8000,
    remote: 'Part-Time',
    datePosted: '2021-05-21 19:30:10',
    location: 90383,
    employerId: 97,
  }
];

const userApplications = [
  {
    id: 4240,
    jobId: 9939,
    applicantId: 30001,
    resume: 'Insert Resume Here',
    coverLetter: 'Insert Cover Letter Here',
    dateSubmitted: null,
    interestLevel: 1,
    status: 0
  },
  {
    id: 4243,
    jobId: 9941,
    applicantId: 30001,
    resume: 'Insert Resume Here',
    coverLetter: 'Insert Cover Letter Here',
    dateSubmitted: '2021-05-22 19:30:10',
    interestLevel: 2,
    status: 2
  }
];

const employerData = {
  id: 97,
  firstName: 'Sam',
  lastName: 'Gasser',
  email: 'sam.gasser@gmail.com',
  phone: '1-800-800-8000',
  organization: 'Atlantic Consultants ',
  notes: 'Grant is not a good applicant'
};

const exampleApplicant = {
  application: {
    id: 4243,
    jobId: 9941,
    applicantId: 30001,
    resume: 'Insert Resume Here',
    coverLetter: 'Insert Cover Letter Here',
    dateSubmitted: '2021-05-22 19:30:10',
    interestLevel: 'extremely',
    status: 'interviewed'
  },
  userInformation: {
    id: 30001,
    firstName: 'Grant',
    lastName: 'Schaeffer',
    phone: '1-800-800-8000',
    email: 'grant.schaeffer@hotmail.com',
    dob: '01/01/1987',
    gender: 'male',
    username: 'gschaeffer',
  }
};

const dummyData = {
  userData,
  userCalendar,
  userApplications,
  jobPostings,
  employerData,
  exampleApplicant
};

module.exports = dummyData;