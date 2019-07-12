const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sigsa_reservation',
});

connection.connect();

module.exports = connection;
