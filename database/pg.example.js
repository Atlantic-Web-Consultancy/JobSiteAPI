const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'jobsite',
  password: '',
  port: 5432,
});
client.connect(err => {
  if (err) {
    console.log('Error connecting to jobsite db', err);
  } else {
    console.log('Connected to jobsite db!');
  }
});
module.exports = client;