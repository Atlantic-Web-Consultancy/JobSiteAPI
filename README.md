# JobSite API

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#schema">Schema</a></li>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#goals">Goals</a></li>
    <li><a href="#challenges">Challenges</a></li>
    <li><a href="#optimizations">Optimizations</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#future-improvements">Future Improvements</a></li>
  </ul>
</details>

## About

- JobSiteAPI is a backend API for JobSite, which is a website which seeks to connect Job Seekers to Employers. The API has many endpoints to both create Job Postings, Job Applications, as well as to submit documents (such as Resumes & Cover Letters).

## Built with

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org)

## Getting Started

1. Clone this repository
2. cd into the directory on your local machine
3. Install Postgres
4. Initialize your postgres database

```
psql -d jobsite < ./database/Schema.SQL
```
5. Create a pg.js file in /database, with a formatting similar to pg.example.js
6. Install dependencies

```
npm install
```

7. Start server

```
npm start
```

## Schema

![Schema Image](https://raw.githubusercontent.com/Atlantic-Web-Consultancy/JobSiteAPI/master/database/BlueOceanSchema.png)

## Overview

- Selected DBMS technology (**PostgreSQL**) to design our database prioritizing performance in anticipation of a populating large dataset. Designed a primary database (w/ PostgreSQL) and opted to store documents in a server directory.
- Generated and performed **Extract, Transform, Load (ETL)** ingestion process on sample dataset into PostgreSQL.
  - **~1000 records per table**
  - **~2000 user authentications split between types seeker/employer**
  - **Designed and created API logic, defined routes expected by the API, integrated server and database.**

## Goals

1. Create a database which can serve as an API for our JobSite Website.
2. Be able to accept documents, encrypt the document's filename, and return that document back to a user.
3. Authenticate users, and only return associated data if a user is authorized to view that data.

## Challenges

1. Filter Job Postings by Distance: mplementing a System to return Job Postings with a certain distance. Ultimately this was implemented using a separate API which will fetch a User's IP Address, convert it to a zip code, then connects to a separate API to find all zip codes within a given distance. Then with this set of zip codes, applicable Job Postings are matched and returned.

2. Document Storage & Retrieval: We needed a way to store documents which may have the same filename, and allow retrieval of those files with the original filename. Additionally the need to be able to search these documents was necessary. Ultimately the NPM module Multer was employed to store the files, and various parsers were used to store a parsed version of a document into our database. The storing of the parsed version allows for easy search compatibility.


## Optimizations
 - Usage of Inner Joins, as opposed to multiple queries to retrieve data.

## API Documentation

## Unauthenticated Routes
### Create A Seeker User

Creates a Job Seeker in the database.

- POST `/createSeeker`

**Form Data:**

- `username`: User's desired username (string)
- `password`: User's desired password (string)
- `first_name`: First Name (string)
- `last_name`: Last Name (string)
- `address1`: The first line of a user's address (string)
- `adress2`: The second line of a user's address (string)
- `city`: User's first name (string)
- `state`: User's first name (string)
- `zip`: User's zip code (integer)
- `country`: Country where user is located (string)
- `phone`: User's phone number (integer)
- `email`: User's email address (string)
- `dob`: User's date of birth, given in UNIX time (integer)
- `gender`: User's gender (string)

**Success Status Code:** `200`

### Create An Employer User
- POST `/createEmployer`

**Form Data:**

- `username`: Employer's desired username (string)
- `password`: Employers's desired password (string)
- `first_name`: First Name (string)
- `last_name`: Last Name (string)
- `email`: Employers's email address (string)
- `phone`: Employers's phone number (integer)
- `organization`: Employers's organization (string)

**Success Status Code:** `200`

### Get Jobs

- GET `/jobs`

**Form Data:**

- `employmentTitle`: Filter by title of position sought (string)
- `employmentType`: Filter by contract/Temp/Full-Time/Part-Time (string)
- `experience_level`: Filter by Junior/Senior/Executive (string)
- `salaryMin`: Filter by minimum salary requirement (integer)
- `salaryMax`: Filter by maximum salary (integer)
- `remote`: Filter remote positions? (string)
- `date`: Filter by date posted (integer)
- `distance`: Filter by distance (integer)

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "id": 1544,
        "employer_id": 1544,
        "title": "Manager Parts",
        "description": "Lobortis adipiscing euismod suscipit enim suscipit commodoconsequat. Volutpat nulla eros qui velit ad erat eum nonummy in. Vel commodo consequatvel nostrud et erat ut dignissim volutpat vero augue. Commodo aliquip commodo nislut iriuredolor. Euismod illum vero luptatum nostrud. Enim wisi wisi dignissim velit. \n\n",
        "employment_type": "Part-Time",
        "experience_level": "3+ Years",
        "salary": 279424,
        "type_work": "Onsite",
        "date_posted": "1622188289206",
        "location": 50323,
        "username": "gveryanf3",
        "first_name": "Rickert",
        "last_name": "Thorrington",
        "email": "rthorringtonf3@craigslist.org",
        "phone": "445-813-0339",
        "organization": "TechnoFace"
    }
]
```

### Read Blog Posts

- GET `/blog`

**Success Status Code:** `200`

**Response Body**: JSON

```json
[
    {
        "id": 1,
        "first_name": "Hughie",
        "last_name": "Givens",
        "date_posted": "1319109177",
        "title": "ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla",
        "content": "Suspendisse potenti. Cras in purus eu magna vulputate luctus."
    }
]
```


## Authenticated Routes
### Login

- POST `/login`

**Form Data:**

- `username`: Users's username (string)
- `password`: Userss's password (string)

**Success Status Code:** `200`

**Returns:** Cookie

### Logout

- GET `/logout`

**Success Status Code:** `200`

### Create A Note

- POST `/notes`

**Form Data:**

- `content`: Note content (string)

**Success Status Code:** `201`

### Get Notes

- GET `/notes`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "job_id": 2,
        "content": "Make a job application today by 4!"
    }
]
```

### Create A Calendar Event

- POST `/calendar`

**Form Data:**

- `event_name`: Event name (string)
- `start_time`: Event start time hour (integer)
- `end_time`: Event end time hour (integer)
- `location`: Event location (string)

**Success Status Code:** `201`

### Get Calendar

- GET `/calendar`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "id": 1,
        "user_id": 1001,
        "event_name": "Meeting with Job Applicant",
        "start_time": 1622324972,
        "end_time": 1622460000,
        "location": "Library"
    }
]
```

### Get A Seekers's Profile

- GET `/seekers`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
    "id": 1,
    "username": "pwhiskin0",
    "first_name": "Colan",
    "last_name": "Goudman",
    "address1": "4730 Russell Crossing",
    "address2": "163",
    "city": "Pittsburgh",
    "state": "Pennsylvania",
    "country": "United States",
    "zip": 15215,
    "phone": "(412) 5440225",
    "email": "cgoudman0@elpais.com",
    "dob": 1555138800,
    "gender": "Male"
}
```

### Update A Seekers's Profile

- PATCH `/seekers`

**Form Data:**
See: Create A Seeker User

**Success Status Code:** `200`

### Apply to a Job

- POST `/jobs/create`

**Form Data:**
- `job_id`: ID of Job (integer)
- `resume`: ID of Resume Document (integer)
- `cover`: ID of Resume Document (integer)
- `interest_level`: Interest Level - Interested, Very, Extremely (string)
- `status`: Status of Application - Saved, Applied, Interviewed (string)
- `submissionDate`: Time of Submission in UNIX Time (integer)

**Success Status Code:** `201`

### Update A Seekers's Job Application

- PATCH `/jobs/apply`

**Form Data:**
See: Apply to a Job

**Success Status Code:** `200`

### Get A Seekers's Job Applications

- GET `/seekers/applications`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "id": 8,
        "job_id": 8,
        "applicant_id": 1,
        "resume": 1,
        "cover": 1,
        "submission_date": "1621949093000",
        "interest_level": "Very Interested",
        "status": "Interviewed",
        "employer_id": 1661,
        "title": "Educational Counselor",
        "description": "Elitsed illum dolor nisl lorem in ut elitsed iriure autem vel. Dolore volutpat blandit lorem elitsed dolor. Duis esse ullamcorper commodo in qui. \n\n",
        "employment_type": "Part-Time",
        "experience_level": "5+ Years",
        "salary": 223521,
        "type_work": "Remote",
        "date_posted": "1622188498266",
        "location": 97232
    }
]
```


### Get An Employer's Profile

- GET `/employers`

**Success Status Code:** `200`

**Returns:** JSON

```json
{
    "id": 1001,
    "username": "jwooster0",
    "first_name": "Carney",
    "last_name": "Scattergood",
    "email": "cscattergood0@spotify.com",
    "phone": "634-996-4093",
    "organization": "Buzzshare"
}
```

### Update An Employer's Profile

- PATCH `/employers`

**Form Data:**
See: Create An Employer User

**Success Status Code:** `200`

### Create A Job Posting

- POST `/jobs/create`

**Form Data:**
- `title`: Job title (string)
- `description`: Job description(string)
- `employment_type`: Type of employment: Full-time, part-time (string)
- `experience_level`: Experience level required for job (string)
- `salary`: Salary (integer)
- `type_work`: Type of work: Remote, Onsite (string)
- `location`: Zip Code of Job (integer)

**Success Status Code:** `201`

### Get An Employer's Job Postings

- GET `/employers/jobpostings`

**Success Status Code:** `200`

**Returns:** JSON

```json
[
    {
        "id": 3,
        "employer_id": 1001,
        "title": "Water Maintenance Worker",
        "description": "Praesent wisi eu et consequat ea. Odio aliquip iriure minim consectetuer eros te vel amet wisi. Dignissim nulla iriure qui. Ut illum dolore illum blandit illum eros nulla nislut lobortis doloremagna eros laoreet ex. Delenit nostrud ex qui dolor molestie facilisi dignissim feugait in. \n\n",
        "employment_type": "Temporary",
        "experience_level": "1 Year",
        "salary": 763332,
        "type_work": "Remote",
        "date_posted": "1622188473280",
        "location": 52077
    },
]
```

### Post/Save Application to Job

- POST  `/jobs/apply`

**Body Parameters:**

- `jobId`: ID of posted job in database. (integer)
- `resume`: ID of stored resume document. (integer)
- `cover`: ID of stored cover letter document. (integer)
- `submissionDate`: UNIX timestamp of time job application submitted. (integer)
- `interestLevel`: Text representing job seeker's interest in the job. (string)
- `status`: Text representing job seeker's application status. (string)

**Success Status Code:** `201`

### Update Saved Job Application

- PATCH  `/jobs/apply`

**Body Parameters:**

- `jobId`: ID of posted job in database. (integer)
- `resume`: ID of stored resume document. (integer)
- `cover`: ID of stored cover letter document. (integer)
- `submissionDate`: UNIX timestamp of time job application submitted. (integer)
- `interestLevel`: Text representing job seeker's interest in the job. (string)
- `status`: Text representing job seeker's application status. (string)

**Success Status Code:** `201`

### Fetch Submitted Applications for Job

- GET `/job/:jobId/applicants`

**Path Parameters:**

- `jobId`: ID of posted job in database. (integer)

**Query Parameters:**

- `filter`: Keywords to search applicants by. (string)

**Success Status Code:** `200`

**Response Body**: Expects JSON with the following keys.

```json
[
    {
        "applicant_id": 1,
        "resume": 1,
        "cover": 2,
        "submission_date": 938989,
        "text": "Resume Text",
        "first_name": "Colan",
        "last_name": "Goudman",
        "phone": "(412) 5440225",
        "email": "cgoudman0@elpais.com",
        "dob": 1555138800,
        "gender": "Male"
    }
]
```

### Upload Resume / Cover Letter

Saves a document in the server's documents/ directory.

- POST `/documents`

**Path Parameters:**

- File itself if uploading .docx or .pdf file.
- `document`: Text content of the document to be uploaded if uploading from text field. (string)

**Success Status Code:** `201`

### Download Resume / Cover Letter

- GET `/documents`

**Path Parameters:**

- `id`: ID of document to be downloaded. (integer)

**Success Status Code:** `200`

## Future Improvements

- Implement chat feature between users.
- Encrypt user documents for privacy reasons.
