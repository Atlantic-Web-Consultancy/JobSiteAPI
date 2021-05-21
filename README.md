# JobSite API

JobSite is an application to connect users to employers with ease. This repository specifically handles the API end of the JobSite Website.

## Pathways

### Authentication Endpoints
### POST /login: To login to the website
    {
      username: string,
      password: string
    }

#### POST /createUser: To create an applicant account
    {
      username: string,
      password: string,
      firstName: string,
      lastName: string,
      address1: string,
      address2: string,
      city: string,
      state: string (Max 2 Characters),
      country: string,
      zip: integer,
      email: string,
      phone: string,
      dob: string,
      gender: string,
    }

#### POST /createEmployer: To create an employer account
    {
      username: string,
      password: string,
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      organization: string
    }

### User Endpoints
#### GET /users/:userId: To retrieve a user's information
    {
      id: integer,
      username: string,
      firstName: string,
      lastName: string,
      address1: string,
      address2: string,
      city: string,
      state: string (Max 2 Characters),
      country: string,
      zip: integer,
      email: string,
      phone: string,
      dob: string,
      gender: string,
      notes: string,
    }

#### POST /users/:userId
    {
      id: integer,
      [changedFields]
    }

#### GET /users/:userId/notes: To retrieve a user's notes
    {
      string
    }

