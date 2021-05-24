const express = require('express');
const app = express();
const port = 3001;
const parseCookies = require('../middleware/cookieParser.js');
const { Seeker, Employer } = require('../controllers/controllers.js');
const client = require('../database/pg.js');


const dummyData = require('./exampleData.js');
app.use(parseCookies);
// app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`JobSite API listening at http://localhost:${port}`);
});

app.post('/createSeeker', (req, res) => {
  Seeker.createSeeker(req.body, (err) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(201);
      res.end();
    }
  })
});

app.post('/createEmployer', (req, res) => {
  Employer.createEmployer(req.body, (err) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(201);
      res.end();
    }
  })
});

app.post('/login', (req, res) => {
  res.status(200);
  res.end(); //To be built out
});

app.get('/users/:userId', (req, res) => {
  const queryString = `SELECT * FROM applicants;`
  client.query(queryString)
  .then((data) => {
    res.status(200);
    res.send(data);
  })
  .catch((err) => {
    res.status(404);
    res.send(err);
  })
  // res.send(dummyData.userData);
});

app.post('/users/:userId', (req, res) => {
  res.status(200);
  res.end();
});

app.get('/users/:userId/notes', (req, res) => {
  res.send(dummyData.userData['notes']);
});

app.post('/users/:userId/notes', (req, res) => {
  res.status(200);
  res.end()
});

app.get('/users/:userId/calendar', (req, res) => {
  res.send(dummyData.userCalendar);
});

app.get('/users/:userId/applications', (req, res) => {
  res.send(dummyData.userApplications);
});

app.get('/jobs', (req, res) => {
  //Getting All Available Postings
  res.send(dummyData.jobPostings);
});

app.post('/jobs', (req, res) => {
  //Submitting Application
  res.send();
});

app.get('/employers/:userId', (req, res) => {
  res.send(dummyData.employerData);
});

app.post('/employers/:userId', (req, res) => {
  res.send();
});

app.get('/employers/:userId/notes', (req, res) => {
  res.send(dummyData.employerData.notes);
});

app.post('/employers/:userId/notes', (req, res) => {
  res.status(200);
  res.end();
});

app.get('/employers/:userId/calendar', (req, res) => {
  res.send(dummyData.userCalendar);
});

app.get('/employers/:userId/jobpostings', (req, res) => {
  res.send(dummyData.jobPostings);
});

app.get('/job/:jobId/applicants', (req, res) => {
  res.send(dummyData.exampleApplicant);
});

app.post('/jobs/create', (req, res) => {
  res.status(200);
  res.end();
});

