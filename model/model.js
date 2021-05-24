const client = require('../database/pg.js');
const utils = require('../lib/hashUtils.js');



// invoked by controller code
// query database directly
// pass data back to contorller code as callback
// ALSO:
// probably have to figure out how we determine location here


const Seeker = {
  createSeeker: (data, callback) => {
    // insert data.username into Auth
    // salt, hash pw - insert into Autho
    // insert rest of data into applicant
    const salt = utils.createRandom32String();
    const hashedPassword = utils.createHash(data.password, salt);
    const authQueryString = `INSERT INTO auth (username, pwhash, salt) VALUES ($1, $2, $3) RETURNING id`;
    const authValues = [
      data.username,
      hashedPassword,
      salt
    ]
    const authQuery = {
      text: authQueryString,
      values: authValues
    }
    client.query(authQuery)
      .then((authData) => {
        const seekerQueryString = `INSERT INTO applicants (id, username, first_name, last_name, address1, address2, city, state, country, zip, phone, email, dob, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
        const seekerValues = [
          authData.rows[0].id,
          data.username,
          data.first_name,
          data.last_name,
          data.address1,
          data.address2,
          data.city,
          data.state,
          data.country,
          data.zip,
          data.phone,
          data.email,
          data.dob,
          data.gender
        ];
        const seekerQuery = {
          text: seekerQueryString,
          values: seekerValues
        }
        return client.query(seekerQuery);
      })
      .then(callback(null))
      .catch((err) => {
        console.log(err);
        callback(err);
      });
  }
}

const Employer = {
  createEmployer: (data, callback) => {
    // insert data.username into Auth
    // salt, hash pw - insert into Autho
    // insert rest of data into applicant
    const salt = utils.createRandom32String();
    const hashedPassword = utils.createHash(data.password, salt);
    const authQueryString = `INSERT INTO auth (username, pwhash, salt) VALUES ($1, $2, $3) RETURNING id`;
    const authValues = [
      data.username,
      hashedPassword,
      salt
    ]
    const authQuery = {
      text: authQueryString,
      values: authValues
    }
    client.query(authQuery)
      .then((authData) => {
        const employerQueryString = `INSERT INTO employers (id, username, first_name, last_name, email, phone, organization) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const employerValues = [
          authData.rows[0].id,
          data.username,
          data.first_name,
          data.last_name,
          data.email,
          data.phone,
          data.organization
        ];
        const employerQuery = {
          text: employerQueryString,
          values: employerValues
        }
        return client.query(employerQuery);
      })
      .then(() => callback(null))
      .catch((err) => {
        callback(err);
      });
  }
}
module.exports = {
  Seeker,
  Employer
}
