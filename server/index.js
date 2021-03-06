const express = require('express');
const app = express();
const port = 3001;
const parseCookies = require('../middleware/cookieParser.js');
const Controller = require('../controllers/');
const multer = require('multer');
const upload = multer({ dest: 'documents/' });

const client = require('../database/pg.js');
var cors = require('cors');
app.use(cors());

app.use(parseCookies);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`JobSite API listening at http://localhost:${port}`);
});

app.post('/createSeeker', (req, res) => {
  Controller.Seeker.createSeeker(req.body, (err) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.post('/createEmployer', (req, res) => {
  Controller.Employer.createEmployer(req.body, (err) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.post('/login', (req, res) => {
  Controller.General.login(req.body, (err, cookie) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.cookie('jobsite', cookie);
      res.end();
    }
  });
});

app.get('/logout', (req, res) => {
  Controller.General.logout(req, (err) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.clearCookie('jobsite');
      res.status(200);
      res.end();
    }
  });
});

app.post('/notes', (req, res) => {
  Controller.General.createNote(req, (err) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.get('/notes', (req, res) => {
  Controller.General.getNote(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.post('/calendar', (req, res) => {
  Controller.General.createCalendar(req, (err) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.get('/calendar', (req, res) => {
  Controller.General.getCalendar(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.get('/seekers', (req, res) => {
  Controller.Seeker.getSeeker(req, (err, data) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.patch('/seekers', (req, res) => {
  Controller.Employers.changeSeeker(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.get('/seekers/applications', (req, res) => {
  Controller.Seeker.getSeekerApplication(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.get('/employers', (req, res) => {
  Controller.Employer.getEmployer(req, (err, data) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.patch('/employers', (req, res) => {
  Controller.Employers.changeEmployer(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.get('/employers/jobpostings', (req, res) => {
  Controller.Employer.getEmployerPostings(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.get('/jobs', (req, res) => {
  Controller.General.getJobs(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.post('/jobs/create', (req, res) => {
  Controller.General.createJob(req, (err) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.post('/jobs/apply', (req, res) => {
  Controller.General.applyJob(req, (err) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.patch('/jobs/apply', (req, res) => {
  Controller.General.updateApplication(req, (err) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.get('/job/:jobId/applicants', (req, res) => {
  Controller.Employer.getSeekers(req, (err, data) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.send(data);
    }
  });
});

app.get('/blog', (req, res) => {
  Controller.General.getBlog(req, (err, data) => {
    if (err) {
      res.status(404);
      res.end();
    }
    res.status(200).send(data);
  });
});

app.post('/documents', upload.single('document'), (req, res) => {
  Controller.General.createDocument(req, (err, data) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(201).send(data.toString());
    }
  });
});

app.get('/documents', (req, res) => {
  Controller.General.getDocument(req, (err, data) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.download(`${__dirname}/../documents/${data.document_hash}`, data.document_name);
    }
  });
});