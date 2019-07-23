const mysql = require('mysql');
const MYSQLCREDENTIAL = require('../../mySQL.config');

const connection = mysql.createConnection({
  host: 'localhost', // to be 'db'
  user: MYSQLCREDENTIAL.user,
  password: MYSQLCREDENTIAL.password,
  database: 'sigsa_reservation',
});

connection.connect();

module.exports = connection;
