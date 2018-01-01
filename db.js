var promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: promise
});

// Preparing the connection details:
const cn = 'postgres://postgres:123@localhost:5432/test_jubelio';

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;